# Lit CLI Tool

**This tool is currently in development and is not recommended for any production or serious projects! :)**

This Lit CLI Tool is a Node.js-based command line interface designed to streamline the process of creating new Lit projects. It automates the setup of Lit project environments, including repository initialization and dependency management, with the potential for further customizations and features.

## Installation

To install the Lit CLI Tool, use npm with the following command:

```bash
npm install -g lit-cli-tool
```

This will install the tool globally on your system, making the `lit` command available in your terminal.

## How to Use

To create a new Lit project, use the `lit` command followed by `new` and your desired project name. For example:

```bash
lit new my-lit-project
```

This command will scaffold a new Lit project named `my-lit-project`, including cloning a starter template, installing dependencies, and optionally creating a GitHub repository if the GitHub CLI tool is installed and configured on your system.

## Features

- Scaffold new Lit projects with a single command. (This is currently limited to the official TypeScript starter template. Further scaffolding choices are the next TODOs.)
- Optional GitHub repository creation during project setup.

## Current TODOs:

- [ ] Implement TypeScript / JavaScript toggling to allow users to choose between project types.
- [ ] Outline and implement custom project scaffolding options.
- [ ] Enable toggling between official starter templates and custom scaffolds.
- [ ] Add a command to create individual Lit components within a project.

## Future Development Ideas

- [ ] **Live Reload Development Server**: Integrate a development server with live reload capabilities.
- [ ] **Component Generator with Templates**: Add customizable templates for common component patterns.
- [ ] **Linting and Formatting Setup**: Include options for tools like ESLint and Prettier.
- [ ] **Unit Testing Integration**: Simplify setup for unit testing frameworks tailored for Lit components.
- [ ] **CSS Preprocessors Support**: Add support for SASS or LESS.
- [ ] **State Management Setup**: Facilitate integration with state management solutions.
- [ ] **i18n (Internationalization) Support**: Tools for managing multiple language versions.
- [ ] **Build and Deployment Automation**: Automate build processes and deployment to various platforms.
- [ ] **Customizable Project Templates**: Allow users to create and use their own project templates.
- [ ] **Plugin System**: Implement a system for extending the CLI tool with additional features.
- [ ] **Interactive Mode**: Provide an interactive setup mode with prompts and options.
- [ ] **Docker Integration**: Options for containerizing the app with Docker.
- [ ] **Performance Audits**: Include tools for performance analysis and optimization.
- [ ] **Documentation Generator**: Auto-generate documentation from the code.
