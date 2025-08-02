import { requireOptions } from '../prompts/select-options.prompt.js';
import { readDir } from '../utils/fs.utils.js';
import { log } from '../helpers/logger.helper.js';
import { handleExpressSetup } from '../frameworks/express.handler.js';

export const generateAuthBoilerplate = async (options) => {
  options = await requireOptions(options);
  log.info(`Generating authentication boilerplate with the following options: framework: ${options.framework}, strategy: ${options.strategy}`);

  try {
    const files = await readDir(process.cwd());

    if (!files.includes('package.json')) {
      log.error('You need to set up an express project');
      return;
    }

    if (options.framework === 'express.js') {
      await handleExpressSetup();
    }
  } catch (error) {
    log.error(`Failed to read directory: ${error.message}`);
  }
}
