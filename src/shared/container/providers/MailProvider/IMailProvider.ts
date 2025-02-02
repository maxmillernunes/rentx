import type { IMailProvierTDO } from './dtos/IMailProviderTDO';

export interface IMailProvider {
  sendMail(data: IMailProvierTDO): Promise<void>;
}
