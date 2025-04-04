import { container, delay } from 'tsyringe';
import { LocalStorageProvier } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import type { IStorageProvider } from './IStorageProvider';
import upload from '@config/upload';

const storage = {
  disk: container.resolve(LocalStorageProvier),
  s3: container.resolve(S3StorageProvider),
} as const;

container.registerInstance<IStorageProvider>(
  'StorageProvider',
  storage[upload.driver]
);
