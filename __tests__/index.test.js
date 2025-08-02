import { jest } from '@jest/globals';

jest.unstable_mockModule('../utils/fs.utils.js', () => ({
  readDir: jest.fn(),
  copyFolder: jest.fn(),
}));

jest.unstable_mockModule('../helpers/logger.helper.js', () => ({
  log: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));

jest.unstable_mockModule('../prompts/select-options.prompt.js', () => ({
  requireOptions: jest.fn(),
}));

const fsUtils = await import('../utils/fs.utils.js');
const logger = await import('../helpers/logger.helper.js');
const prompt = await import('../prompts/select-options.prompt.js');
const { generateAuthBoilerplate } = await import('../commands/create-auth.js');


describe('generateAuthBoilerplate', () => {
  test('log error if directory does not contain package.json file', async () => {
    fsUtils.readDir.mockResolvedValue(['index.js']);

    logger.log.error.mockClear();
    logger.log.info.mockClear();

    prompt.requireOptions.mockResolvedValue({
      framework: 'express.js',
      strategy: 'jwt',
    });

    await generateAuthBoilerplate({ framework: 'express.js', strategy: 'jwt' });

    expect(logger.log.error).toHaveBeenCalledWith('You need to set up an express project');
  });
});
