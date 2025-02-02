import { container } from 'tsyringe';
import { LocalStorageProvier } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import type { IStorageProvider } from './IStorageProvider';
import upload from '@config/upload';

const storage = {
  disk: LocalStorageProvier,
  s3: S3StorageProvider,
} as const;

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[upload.driver]
);
