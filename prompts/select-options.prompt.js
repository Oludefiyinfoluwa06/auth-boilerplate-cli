import inquirer from 'inquirer';
import { FRAMEWORKS, STRATEGIES } from '../utils/data.utils.js';

export const requireOptions = async (options) => {
  const questions = [];

  if (!options.framework || !FRAMEWORKS.includes(options.framework)) {
    questions.push({
      type: 'list',
      name: 'framework',
      message: 'Select a framework:',
      choices: FRAMEWORKS,
      default: FRAMEWORKS[0],
    });
  }

  if (!options.strategy || !STRATEGIES.includes(options.strategy)) {
    questions.push({
      type: 'list',
      name: 'strategy',
      message: 'Select a strategy:',
      choices: STRATEGIES,
      default: STRATEGIES[0],
    });
  }

  if (questions.length === 0) {
    return options;
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    ...answers,
  };
}
