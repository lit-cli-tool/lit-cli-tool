import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { checkGhInstalled } from '../src/utilities.js';

async function createNewProject(projectName) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(projectName)) {
    console.error(
      'Invalid project name format. Should be hyphenated lowercase.'
    );
    return;
  }

  console.log(`Creating project: ${projectName}`);
  const githubRepo =
    'https://github.com/lit/lit-element-starter-ts.git';

  try {
    execSync(`git clone ${githubRepo} ${projectName}`, {
      stdio: 'inherit',
    });
    process.chdir(projectName);
    execSync('rm -rf .git', { stdio: 'inherit' });
    execSync('npm install', { stdio: 'inherit' });

    if (checkGhInstalled()) {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createRepo',
          message:
            'Do you want to create a GitHub repository for this project?',
          default: false,
        },
        {
          type: 'confirm',
          name: 'repoPublic',
          message: 'Should the repository be public?',
          default: true,
          when: (answers) => answers.createRepo,
        },
      ]);

      if (answers.createRepo) {
        const repoVisibility = answers.repoPublic
          ? '--public'
          : '--private';

        // Initialize Git repository
        execSync('git init', { stdio: 'inherit' });

        // Create GitHub repository and set up remote origin
        const githubUsername = execSync(
          'gh api /user --jq .login',
          { encoding: 'utf-8' }
        ).trim();
        execSync(
          `gh repo create ${projectName} ${repoVisibility} --source=.`,
          { stdio: 'inherit' }
        );

        // Add, commit, and push files to the remote repository
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "Initial commit"', {
          stdio: 'inherit',
        });
        execSync('git branch -M main', {
          stdio: 'inherit',
        });
        execSync('git push -u origin main', {
          stdio: 'inherit',
        });
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }

  console.log('Project setup completed successfully.');
}

export { createNewProject };
