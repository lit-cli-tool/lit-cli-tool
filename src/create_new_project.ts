import {execSync} from 'child_process';
import inquirer from 'inquirer';
import {checkGhInstalled, getProjectName} from './utilities.js';

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
  
  let language: Language = 'TypeScript';
  if (template === 'Skeleton') {
    const {language: chosenLanguage} = await inquirer.prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Which language would you like to use?',
        choices: ['TypeScript', 'JavaScript'],
        default: 'TypeScript'
      }
    ]);
    language = chosenLanguage;
    
    if (language === 'TypeScript') {
      const {confirmation} = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmation',
          message: 'The TypeScript Skeleton project is under development and not currently intended to be used. Are you sure you want to use it?',
          default: false
        }
      ]);
      if (!confirmation) {
        const {jsConfirm} = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'jsConfirm',
            message: 'Would you like to use the JavaScript skeleton instead?',
            default: true
          }
        ]);
        if (jsConfirm) {
          language = 'JavaScript';
        } else {
          return;
        }
      }
    }
  }
  
  const {createRepo, repoPublic}: InquirerLanguageRepoResponse = await inquirer.prompt([
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
  const shortLanguage: string = (language === 'TypeScript') ? 'ts' : 'js';
  if (template === 'Skeleton') {
    githubRepo = `https://github.com/lit-cli-tool/lit-cli-skeleton-${shortLanguage}.git`;
  } else {
    githubRepo = `https://github.com/lit/lit-element-starter-${shortLanguage}.git`;
  }
  execSync(`git clone ${githubRepo} ${projectName}`, {stdio: 'inherit'});
  
  process.chdir(projectName);
  execSync('npm install', {stdio: 'inherit'});
  
  if (!checkGhInstalled()) return;
  
  if (!createRepo) return;
  
  const repoVisibility: string = repoPublic ? '--public' : '--private';
  
  execSync('git init', {stdio: 'inherit'});
  execSync('git remote remove origin');
  execSync(`gh repo create ${projectName} ${repoVisibility} --confirm --source=.`, {stdio: 'inherit'});
  execSync('git add .', {stdio: 'inherit'});
  execSync('git commit -m "Initial commit"', {stdio: 'inherit'});
  execSync('git branch -M main', {stdio: 'inherit'});
  execSync('git push -u origin main', {stdio: 'inherit'});
  
  console.log('Project setup completed successfully.');
}

export {createNewProject};