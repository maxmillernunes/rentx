import { promises } from 'node:fs';
import { injectable } from 'tsyringe';
import { SES } from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { IMailProvider } from '../IMailProvider';
import type { IMailProvierTDO } from '../dtos/IMailProviderTDO';
import mailConfig from '@config/mail';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: process.env.AWS_API_VERSION,
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({
    from,
    to,
    subject,
    variables,
    path,
  }: IMailProvierTDO): Promise<void> {
    const { name, email } = mailConfig.default.from;

    const templateFileContent = await promises.readFile(path, {
      encoding: 'utf-8',
    });

    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: { address: to.email, name: to.name },
      subject,
      html: templateHTML,
    });

    console.log('Message send: %s', message.messageId);
    console.log('Message send: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { SESMailProvider };
