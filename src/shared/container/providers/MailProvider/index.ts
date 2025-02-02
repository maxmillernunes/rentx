import { container } from 'tsyringe';
import { SESMailProvider } from './implementations/SESMailProvider';
import { SendGridMailProvider } from './implementations/SendGridMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import type { IMailProvider } from './IMailProvider';

const mailProvier = {
  ses: container.resolve(SESMailProvider),
  ethereal: container.resolve(EtherealMailProvider),
  sendgrid: container.resolve(SendGridMailProvider),
} as any;

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvier[process.env.MAIL_PROVIDER]
);
