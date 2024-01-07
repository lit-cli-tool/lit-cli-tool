import { execSync } from 'child_process';

function checkGhInstalled() {
  try {
    execSync('command -v gh', { stdio: 'ignore' });
    return true;
  } catch {
    console.warn(
      'Warning: GitHub CLI (gh) is not installed. Skipping GitHub repository creation.'
    );
    return false;
  }
}

export { checkGhInstalled };
