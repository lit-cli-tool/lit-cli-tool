#!/bin/bash

# Function to check if GitHub CLI is installed
check_gh_installed() {
  if ! command -v gh &>/dev/null; then
    echo "Warning: GitHub CLI (gh) is not installed. Skipping GitHub repository creation."
    return 1 # Return a non-zero status to indicate "not installed"
  fi
  return 0 # Return zero status to indicate "installed"
}

# Function to handle the 'new' command
create_new_project() {
  local project_name=$1

  # Check if project name is correctly formatted
  if ! [[ $project_name =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "Invalid project name format. Should be hyphenated lowercase."
    return 1
  fi

  echo "Creating project: $project_name"

  local github_repo="https://github.com/lit/lit-element-starter-ts.git"

  # Clone the repository
  git clone $github_repo $project_name

  # Check if git clone was successful
  if [ $? -ne 0 ]; then
    echo "Failed to clone the repository."
    return 1
  fi

  # Change directory to the project folder
  cd $project_name

  # Remove any existing git repository configuration
  rm -rf .git

  # Install npm dependencies
  npm install

  # Check if npm install was successful
  if [ $? -ne 0 ]; then
    echo "Failed to install npm dependencies."
    return 1
  fi

  # Ask if the user wants to create a GitHub repository
  read -p "Do you want to create a GitHub repository for this project? (y/n): " create_repo_answer
  case $create_repo_answer in
  [Yy] | [Yy][Ee][Ss])
    # Check if GitHub CLI is installed
    if check_gh_installed; then
      # Get GitHub username using GitHub API
      local github_username=$(gh api /user --jq .login)

      # Ask if the repo should be public or private
      read -p "Should the repository be public? (y for public, n for private): " repo_visibility
      local repo_flag=""
      case $repo_visibility in
      [Yy] | [Yy][Ee][Ss])
        repo_flag="--public"
        ;;
      [Nn] | [Nn][Oo])
        repo_flag="--private"
        ;;
      *)
        echo "Invalid input. Aborting repository creation."
        return 1
        ;;
      esac

      # Create GitHub repository without setting it as remote
      gh repo create $project_name $repo_flag

      # Check if repo creation was successful
      if [ $? -ne 0 ]; then
        echo "Failed to create GitHub repository."
        return 1
      fi

      # Initialize Git, set the remote, and push files to the remote repository
      git init
      git remote add origin https://github.com/$github_username/$project_name.git
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git push -u origin main

    else
      echo "Project successfully created without a GitHub repository."
    fi
    ;;
  [Nn] | [Nn][Oo])
    echo "Skipping GitHub repository creation."
    ;;
  *)
    echo "Invalid input. Skipping GitHub repository creation."
    ;;
  esac

  echo "Project setup completed successfully."
}

# Main command handling
case "$1" in
new)
  create_new_project "$2"
  ;;
*)
  echo "Usage: lit <command> [arguments]"
  echo "Commands:"
  echo "  new <project-name>    Create a new Lit project"
  ;;
esac
