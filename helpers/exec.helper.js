import { execSync } from 'node:child_process';
import ora from 'ora';

export const executeCommands = async (title, command) => {
  const spinner = ora(title).start();

  try {
    execSync(command, { stdio: 'inherit' });
    spinner.succeed('Success');
  } catch (error) {
    spinner.fail(error.message || 'Failed');
  } finally {
    spinner.stop();
  }
}
