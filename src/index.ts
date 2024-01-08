#!/usr/bin/env node

import { program } from 'commander';
import { createNewProject } from './create_new_project';

program
  .command('new <project-name>')
  .description('Create a new Lit project')
  .action(createNewProject);

program.parse(process.argv);
