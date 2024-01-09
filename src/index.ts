#!/usr/bin/env node

import {program} from 'commander';
import {createNewProject} from './create_new_project.js';

program
  .command('new')
  .description('Create a new Lit project')
  .action(createNewProject);

program.parse(process.argv);
