import { promises } from 'node:fs';
import type { IStorageProvider } from '../IStorageProvider';
import { resolve } from 'node:path';
import upload from '@config/upload';

class LocalStorageProvier implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await promises.stat(filename);
    } catch {
      return;
    }

    await promises.unlink(filename);
  }
}

export { LocalStorageProvier };
