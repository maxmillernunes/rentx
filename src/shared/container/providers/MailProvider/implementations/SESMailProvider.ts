import { promises } from 'node:fs';
import { injectable } from 'tsyringe';
import { SES } from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import { IMailProvider } from '../IMailProvider';

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
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
