import { promises } from 'node:fs';
import { injectable } from 'tsyringe';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider } from '../IMailProvider';
import type { IMailProvierTDO } from '../dtos/IMailProviderTDO';
import mailConfig from '@config/mail';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
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

export { EtherealMailProvider };
