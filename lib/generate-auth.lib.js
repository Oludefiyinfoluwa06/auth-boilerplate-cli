import inquirer from 'inquirer';
import { cp, readdir } from 'node:fs';
import { FRAMEWORKS, STRATEGIES } from '../utils/data.utils.js';
import { execSync } from 'node:child_process';
import ora from 'ora';

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

const executeCommands = async (title, command) => {
  const spinner = ora(title);
  spinner.start();

  try {
    execSync(command);
    spinner.succeed('Success');
  } catch (error) {
    spinner.fail(error.message || 'Failed');
  }

  spinner.stop();
}

const generateAuthCode = async () => {
  console.log('Generating auth boilerplate...');
  cp('../auth-templates/express.js', './', { recursive: true }, (error) => {
    if (error) {
      console.log(error);
      throw error;
    }

    console.log('Auth boilerplate generated successfully');
  });
}

export const generateAuthBoilerplate = async (options) => {
  options = await requireOptions(options);
  console.log('Generating authentication boilerplate with the following options: ', options);

  readdir('./', async (error, data) => {
    if (error) {
      throw error;
    }

    if (data.includes('package.json')) {
      if (options.framework === 'express.js') {
        const title = 'Installing dependencies...';
        const command = 'npm install express cors dotenv express-validator bcryptjs jsonwebtoken';
        await executeCommands(title, command);

        generateAuthCode();
      }
    } else {
      console.log('You need to set up an express project');
      return;
    }
  });
}
