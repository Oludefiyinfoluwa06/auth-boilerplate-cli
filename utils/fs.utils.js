import { cp, readdir } from 'node:fs/promises';

export const readDir = async (path) => {
  try {
    return await readdir(path);
  } catch (error) {
    throw new Error(`Failed to read directory: ${error.message}`);
  }
}

export const copyFolder = async (source, destination) => {
  try {
    return await cp(source, destination, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to copy folder: ${error.message}`);
  }
}
