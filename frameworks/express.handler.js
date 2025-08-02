import { executeCommands } from "../helpers/exec.helper.js";
import { generateAuthCode } from "../lib/generate-auth-code.lib.js";

export const handleExpressSetup = async () => {
  const title = 'Installing dependencies...';
  const command = 'npm install express cors dotenv express-validator bcryptjs jsonwebtoken';
  await executeCommands(title, command);

  await generateAuthCode();
}
