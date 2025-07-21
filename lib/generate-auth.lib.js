import inquirer from 'inquirer';
import { FRAMEWORKS, STRATEGIES } from "../utils/data.utils.js";

const requireOptions = async (options) => {
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

  if (questions.length > 0) {
    const answers = await inquirer.prompt(questions);
    options.framework = answers.framework ?? options.framework;
    options.strategy = answers.strategy ?? options.strategy;
  }

  return options;
}

export const generateAuthBoilerplate = async (options) => {
  options = await requireOptions(options);
  console.log('Generating authentication boilerplate with the following options: ', options);
}
