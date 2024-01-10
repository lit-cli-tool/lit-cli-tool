import {execSync} from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

function checkGhInstalled(): boolean {
  try {
    execSync('command -v gh', {stdio: 'ignore'});
    return true;
  } catch {
    console.warn(
      'Warning: GitHub CLI (gh) is not installed. Skipping GitHub repository creation.'
    );
    return false;
  }
}

async function getProjectName(): Promise<string> {
  while (true) {
    const {projectName} = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name',
        validate: function (input: string) {
          if (/^[a-z0-9]+([-_a-z0-9]+)*$/i.test(input)) { // updated regex
            return true;
          }
          return 'Invalid project name format. Should be hyphenated, snake cased, or camel cased.';
        }
      }
    ]);
    if (projectName) return projectName;
  }
}

function generateSetupMessage(projectName: string, template: string = '', ghUsername: string = '') {
  const buildCommand = (template === 'Skeleton') ? 'npm run build' : '';
  const gitHubRepoLine = ghUsername ? `GitHub Repo: https://github.com/${ghUsername}/${projectName}` : '';
  
  let message = `Project setup completed successfully.\n${gitHubRepoLine}\nYou can start working on your project!\ncd ${projectName}`;
  
  if (buildCommand) {
    message += `\n${buildCommand}`;
  }
  
  message += template === 'Official Starter' ? '\nnpm run serve' : '\nnpm run dev';
  
  return chalk.green(boxen(message, {padding: 1, margin: 1, borderStyle: 'double', borderColor: 'green'}));
}

export {checkGhInstalled, getProjectName, generateSetupMessage};