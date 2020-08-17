import { join } from 'path';
import { readFile, readFileSync } from 'fs';
import mime from 'mime';

export function injection(filename) {
  return new Promise((resolve, reject) => {
    const filepath = join(__dirname, filename);

    readFile(filepath, 'utf8', (err, data) => {
      if (err) return reject(err);

      resolve(data);
    });
  });
}

export function externalInjection(...filenames) {
  return new Promise((resolve, reject) => {
    const filepath = join(process.cwd(), ...filenames);

    readFile(filepath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

export function getFileInBase64(filename) {
  return new Promise((resolve, reject) => {
    try {
      filename = join(process.cwd(), filename);
      const fileMime = mime.getType(filename);

      const file = readFileSync(filename, { encoding: 'base64' });
      resolve(`data:${fileMime};base64,${file}`);
    } catch (error) {
      reject(error);
    }
  });
}

export function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
