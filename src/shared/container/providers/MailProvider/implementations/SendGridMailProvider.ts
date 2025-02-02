import { promises } from 'node:fs';
import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { IMailProvider } from '../IMailProvider';
import { IMailProvierTDO } from '../dtos/IMailProviderTDO';
import mailConfig from '@config/mail';

@injectable()
class SendGridMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.SENDGRID_HOST,
      port: Number(process.env.SENDGRID_PORT),
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_API_KEY,
      },
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

export { SendGridMailProvider };
