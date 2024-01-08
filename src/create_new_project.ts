import {execSync} from 'child_process';
import inquirer from 'inquirer';
import {checkGhInstalled} from './utilities';

interface InquirerResponse {
  createRepo: boolean;
  repoPublic: boolean;
}

async function createNewProject(projectName: string): Promise<void> {
  
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(projectName)) {
    console.error(
      'Invalid project name format. Should be hyphenated lowercase.'
    );
    return;
  }
  
  console.log(`Creating project: ${projectName}`);
  const githubRepo: string =
    'https://github.com/lit/lit-element-starter-ts.git';
  
  try {
    execSync(`git clone ${githubRepo} ${projectName}`, {
      stdio: 'inherit'
    });
    process.chdir(projectName);
    execSync('rm -rf .git', {stdio: 'inherit'});
    execSync('npm install', {stdio: 'inherit'});
    
    if (checkGhInstalled()) {
      const {createRepo, repoPublic}: InquirerResponse = await inquirer.prompt<
        InquirerResponse
      >([
        {
          type: 'confirm',
          name: 'createRepo',
          message:
            'Do you want to create a GitHub repository for this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'repoPublic',
          message: 'Should the repository be public?',
          default: true,
          when: (answers: InquirerResponse) => answers.createRepo
        }
      ]);
      
      if (createRepo) {
        const repoVisibility: string = repoPublic ? '--public' : '--private';
        
        // Initialize Git repository
        execSync('git init', {stdio: 'inherit'});
        
        // Create GitHub repository and set up remote origin
        execSync(
          `gh repo create ${projectName} ${repoVisibility} --source=.`,
          {stdio: 'inherit'}
        );
        
        // Add, commit, and push files to the remote repository
        execSync('git add .', {stdio: 'inherit'});
        execSync('git commit -m "Initial commit"', {
          stdio: 'inherit'
        });
        execSync('git branch -M main', {stdio: 'inherit'});
        execSync('git push -u origin main', {stdio: 'inherit'});
      }
    }
  } catch (error: any) {
    if (error && typeof error === 'object') {
      console.error('An error occurred:', error);
    }
  }
  
  console.log('Project setup completed successfully.');
}

export {createNewProject};