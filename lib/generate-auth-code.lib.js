import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyFolder } from "../utils/fs.utils.js";
import { log } from "../helpers/logger.helper.js";

export const generateAuthCode = async () => {
  log.info('Generating auth boilerplate...');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const source = path.resolve(__dirname, '../auth-templates/express.js');
  const destination = process.cwd();

  try {
    await copyFolder(source, destination);
    log.success('Auth boilerplate generated successfully');
  } catch (error) {
    log.error(`Failed to generate auth boilerplate: ${error.message}`);
  }
}
