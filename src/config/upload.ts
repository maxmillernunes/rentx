import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import { resolve } from 'path';

const tempFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tempFolder: string;
  avatarFolder: string;
  carsFolder: string;

  multer: { storage: StorageEngine };

  config: {
    disk: {};

    aws: { bucket: string };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  avatarFolder: 'avatar',
  carsFolder: 'cars',

  multer: {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', tempFolder),
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},

    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
