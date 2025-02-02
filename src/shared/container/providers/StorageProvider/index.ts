import { container } from 'tsyringe';
import { LocalStorageProvier } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import type { IStorageProvider } from './IStorageProvider';

const storage = {
  local: LocalStorageProvier,
  s3: S3StorageProvider,
} as any;

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[process.env.STORAGE]
);
