import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateProvider } from './DateProvider/implementations/DayJsDateProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { LocalStorageProvier } from './StorageProvider/implementations/LocalStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

const storage = {
  local: LocalStorageProvier,
  s3: S3StorageProvider,
} as any;

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storage[process.env.STORAGE]
);
