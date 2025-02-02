import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { S3 } from 'aws-sdk';
import mime from 'mime-types';
import upload from '@config/upload';
import type { IStorageProvider } from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tempFolder, file);

    const fileContent = await promises.readFile(originalName);

    const contentType = mime.contentType(originalName) as string;

    await this.client
      .putObject({
        Bucket: `${upload.config.aws.bucket}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${upload.config.aws.bucket}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
