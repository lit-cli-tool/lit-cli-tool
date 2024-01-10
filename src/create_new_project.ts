import {execSync} from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';
import fs from 'fs';
import {checkGhInstalled, getProjectName, generateSetupMessage} from './utilities.js';

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

async function createNewProject(): Promise<void> {
  const projectName: string = await getProjectName();
  
  console.log(chalk.green(`Creating project: ${projectName}`));
  
  const {template}: InquirerTemplateResponse = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: boxen(chalk.cyan('Which template would you like to use?'), {padding: 1, borderStyle: 'round'}),
      choices: ['Official Starter', 'Skeleton'],
      default: 'Skeleton'
    }
  ]);
  
  let language: Language = 'TypeScript';
  const {language: chosenLanguage} = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: chalk.cyan('Which language would you like to use?'),
      choices: ['TypeScript', 'JavaScript'],
      default: 'TypeScript'
    }
  ]);
  language = chosenLanguage;
  const {createRepo, repoPublic}: InquirerLanguageRepoResponse = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'createRepo',
      message: boxen(chalk.cyan('Do you want to create a GitHub repository for this project?'), {
        padding: 1,
        borderStyle: 'round'
      }),
      default: false
    },
    {
      type: 'confirm',
      name: 'repoPublic',
      message: boxen(chalk.cyan('Should the repository be public?'), {padding: 1, borderStyle: 'round'}),
      default: true,
      when: (answers: InquirerLanguageRepoResponse) => answers.createRepo
    }
  ]);
  
  let githubRepo: string;
  const shortLanguage: string = (language === 'TypeScript') ? 'ts' : 'js';
  if (template === 'Skeleton') {
    githubRepo = `https://github.com/lit-cli-tool/lit-cli-skeleton-${shortLanguage}.git`;
  } else {
    githubRepo = `https://github.com/lit/lit-element-starter-${shortLanguage}.git`;
  }
  
  fs.mkdirSync(projectName);
  process.chdir(projectName);
  
  if (!checkGhInstalled()) {
    execSync(`git clone ${githubRepo} .`, {stdio: 'inherit'});
    execSync('npm install', {stdio: 'inherit'});
    
    console.log(generateSetupMessage(projectName, template));
    return;
  }
  
  if (!createRepo) {
    execSync(`git clone ${githubRepo} .`, {stdio: 'inherit'});
    execSync('npm install', {stdio: 'inherit'});
    
    console.log(generateSetupMessage(projectName, template));
    return;
  }
  
  execSync(`git clone ${githubRepo} .`, {stdio: 'inherit'});
  execSync('rm -rf .git');
  execSync('npm install', {stdio: 'inherit'});
  
  execSync('git init', {stdio: 'inherit'});
  
  const repoVisibility: string = repoPublic ? '--public' : '--private';
  execSync(`gh repo create ${projectName} ${repoVisibility} --confirm`, {stdio: 'inherit'});
  
  const ghStatus: string = execSync('gh auth status', {encoding: 'utf8'});
  let ghUsername = '';
  const ghStatusMatched: RegExpMatchArray | null = ghStatus.match(/Logged in to github\.com account (.+?) /);
  if (ghStatusMatched && ghStatusMatched[1]) {
    ghUsername = ghStatusMatched[1];
  }
  
  execSync(`git remote add origin https://github.com/${ghUsername}/${projectName}.git`, {stdio: 'inherit'});
  execSync('git add .', {stdio: 'inherit'});
  execSync('git commit -m "Initial commit"', {stdio: 'inherit'});
  execSync('git push -u origin HEAD', {stdio: 'inherit'});
  
  console.log(generateSetupMessage(projectName, template, ghUsername));
}

export {createNewProject};