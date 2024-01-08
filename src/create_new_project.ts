import {execSync} from 'child_process';
import inquirer from 'inquirer';
import {checkGhInstalled} from './utilities.js';
import {promises as fs} from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url';

type Template = 'Official Starter' | 'Skeleton';
type Language = 'TypeScript' | 'JavaScript';

interface InquirerTemplateResponse {
  template: Template;
}

interface InquirerLanguageRepoResponse {
  language: Language;
  createRepo: boolean;
  repoPublic: boolean;
}

async function createNewProject(projectName: string): Promise<void> {
  // Ensure the project name is valid
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(projectName)) {
    console.error('Invalid project name format. Should be hyphenated lowercase.');
    return;
  }
  
  console.log(`Creating project: ${projectName}`);
  
  const {template}: InquirerTemplateResponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: ['Official Starter', 'Skeleton'],
      default: 'Skeleton'
    }
  ]);
  
  const {language, createRepo, repoPublic}: InquirerLanguageRepoResponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Which language would you like to use?',
      choices: ['TypeScript', 'JavaScript'],
      default: 'TypeScript'
    },
    {
      type: 'confirm',
      name: 'createRepo',
      message: 'Do you want to create a GitHub repository for this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'repoPublic',
      message: 'Should the repository be public?',
      default: true,
      when: (answers: InquirerLanguageRepoResponse) => answers.createRepo
    }
  ]);
  
  let githubRepo: string;
  if (template === 'Skeleton') {
    const currentPath = fileURLToPath(new URL(import.meta.url));
    const srcDirectory = path.resolve(path.dirname(currentPath), '../templates/skeleton', language.toLowerCase());
    const targetDirectory = path.resolve(process.cwd(), projectName);
    await fs.mkdir(targetDirectory, {recursive: true});
    await fs.copyFile(srcDirectory, targetDirectory);
  } else {
    githubRepo = `https://github.com/lit/lit-element-starter-${language.toLowerCase()}.git`;
    execSync(`git clone ${githubRepo} ${projectName}`, {stdio: 'inherit'});
  }
  
  process.chdir(projectName);
  execSync('npm install', {stdio: 'inherit'});
  
  if (!checkGhInstalled()) return;
  
  if (!createRepo) return;
  
  const repoVisibility: string = repoPublic ? '--public' : '--private';
  
  execSync('git init', {stdio: 'inherit'});
  execSync(`gh repo create ${projectName} ${repoVisibility} --confirm --source=.`, {stdio: 'inherit'});
  execSync('git add .', {stdio: 'inherit'});
  execSync('git commit -m "Initial commit"', {stdio: 'inherit'});
  execSync('git branch -M main', {stdio: 'inherit'});
  execSync('git push -u origin main', {stdio: 'inherit'});
  
  console.log('Project setup completed successfully.');
}

export {createNewProject};