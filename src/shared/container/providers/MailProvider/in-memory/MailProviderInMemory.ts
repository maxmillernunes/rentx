import type { IMailProvierTDO } from '../dtos/IMailProviderTDO';
import type { IMailProvider } from '../IMailProvider';

class MailProvierInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail({
    from,
    to,
    subject,
    variables,
    path,
  }: IMailProvierTDO): Promise<void> {
    this.message.push({ from, to, subject, variables, path });
  }
}

export { MailProvierInMemory };
