import { Command } from 'commander';
import { requireOptions } from './prompts/select-options.prompt.js';
import { readDir } from './utils/fs.utils.js';
import { log } from './helpers/logger.helper.js';
import { handleExpressSetup } from './frameworks/express.handler.js';

const generateAuthBoilerplate = async (options) => {
  options = await requireOptions(options);
  log.info(`Generating authentication boilerplate with the following options: framework: ${options.framework}, strategy: ${options.strategy}`);

  try {
    const data = await readDir(process.cwd());

    if (data.includes('package.json')) {
      if (options.framework === 'express.js') {
        await handleExpressSetup();
      }
    } else {
      log.error('You need to set up an express project');
      return;
    }
  } catch (error) {
    log.error(`Failed to read directory: ${error.message}`);
  }
}

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
