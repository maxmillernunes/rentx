import { container } from 'tsyringe';
import { SESMailProvider } from './implementations/SESMailProvider';
import { SendGridMailProvider } from './implementations/SendGridMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import type { IMailProvider } from './IMailProvider';
import mailConfig from '@config/mail';

const mailProvier = {
  aws: container.resolve(SESMailProvider),
  ethereal: container.resolve(EtherealMailProvider),
  sendgrid: container.resolve(SendGridMailProvider),
} as const;

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvier[mailConfig.driver]
);
