# Lit CLI Tool

This Lit CLI Tool is a custom script designed to streamline the process of creating new Lit projects. It automates the setup of Lit project environments, including repository initialization and dependency management, with potential for further customizations and features.

## Installation

An installation script is still under development. For now, you can manually install the tool by following these steps:

1. Download the `lit_new.sh` script from the repository.
2. Make the script executable:
   ```bash
   chmod +x lit_new.sh
   ```
3. Move the script to a directory in your PATH (e.g., `/usr/local/bin`):
   ```bash
   sudo mv lit_new.sh /usr/local/bin/lit_new
   ```
4. Optionally, create an alias for easier access. Add this line to your `.bashrc` or `.zshrc`:
   ```bash
   alias lit='lit_new'
   ```
5. Reload your shell configuration:
   ```bash
   source ~/.bashrc  # or source ~/.zshrc
   ```

## How to Use

To create a new Lit project:

```bash
lit new <project-name>
```

Replace `<project-name>` with your desired project name. The script will set up a new Lit project, including cloning a starter template, installing dependencies, and optionally creating a GitHub repository. The optional GitHub repository creation requires the installation of the GitHub CLI tool.

## Current TODOs:

- [ ] Develop an installation script for the tool.
- [ ] Implement TypeScript / JavaScript toggling to allow the user to choose between project types.
- [ ] Outline and implement custom project scaffolding.
- [ ] Enable toggling between official starter templates and custom scaffolds.
- [ ] Add a command to create individual Lit components within a project.

## Future Development Ideas

- [ ] **Live Reload Development Server**: Integrate a development server with live reload capability.
- [ ] **Component Generator with Templates**: Add customizable templates for common component patterns.
- [ ] **Linting and Formatting Setup**: Include setup options for tools like ESLint and Prettier.
- [ ] **Unit Testing Integration**: Provide easy setup for unit testing frameworks tailored for Lit components.
- [ ] **CSS Preprocessors Support**: Add support for SASS or LESS.
- [ ] **State Management Setup**: Facilitate integration with state management solutions.
- [ ] **i18n (Internationalization) Support**: Tools for managing multiple language versions.
- [ ] **Build and Deployment Automation**: Automate build processes and deployment to various platforms.
- [ ] **Customizable Project Templates**: Allow users to create/use their own project templates.
- [ ] **Plugin System**: Implement a system for extending the CLI tool with additional features.
- [ ] **Interactive Mode**: Offer an interactive setup mode with prompts and options.
- [ ] **Docker Integration**: Options for containerizing the app with Docker.
- [ ] **Performance Audits**: Include tools for performance analysis and optimization.
- [ ] **Documentation Generator**: Auto-generate documentation from the code.