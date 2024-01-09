import {execSync} from 'child_process';
import inquirer from 'inquirer';


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
    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name',
        validate: function (input: string) {
          if (/^[a-z0-9]+([-_a-z0-9]+)*$/i.test(input)) { // updated regex
            return true;
          }
          return 'Invalid project name format. Should be hyphenated, snake cased, or camel cased.';
        },
      }
    ]);
    if (projectName) return projectName;
  }
}

export {checkGhInstalled, getProjectName};