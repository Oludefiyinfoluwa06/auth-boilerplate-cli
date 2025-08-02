import chalk from 'chalk';

export const log = {
  info: (message) => console.log(chalk.cyan('[INFO]'), message),
  success: (message) => console.log(chalk.green('[SUCCESS]'), message),
  warn: (message) => console.log(chalk.yellow('[WARNING]'), message),
  error: (message) => console.error(chalk.red('[ERROR]'), message),
}
