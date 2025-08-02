import { Command } from 'commander';
import { generateAuthBoilerplate } from './lib/generate-auth.lib.js';

const program = new Command();

program
  .name('auth-boilerplate-cli')
  .description('CLI for managing authentication boilerplate tasks')
  .version('1.0.0')
  .command('create-auth')
  .description('Create a new authentication boilerplate')
  .option('-f, --framework <type>', 'Specify the framework (e.g., express.js)')
  .option('-s, --strategy <type>', 'Specify the authentication strategy (e.g., JWT, OAuth)')
  .action((options) => generateAuthBoilerplate(options))
  .parse(process.argv);
