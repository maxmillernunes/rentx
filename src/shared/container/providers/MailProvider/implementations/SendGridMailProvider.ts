import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { promises } from 'node:fs';

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

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = await promises.readFile(path, {
      encoding: 'utf-8',
    });

    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      from: {
        address: 'maxmillernuneswork@gmail.com>',
        name: 'Maxmiller Nunes',
      },
      to,
      subject,
      html: templateHTML,
    });
  }
}

export { SendGridMailProvider };
