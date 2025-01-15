import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import type { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import type { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import type { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import auth from '@config/auth';
import type { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = uuid();

    const expires_date = this.dayJsDateProvider.addHours(
      auth.expires_in_forgot_password
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token: token,
      user_id: user.id,
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para o reset: ${token}`
    );
  }
}

export { SendForgotPasswordMailUseCase };
