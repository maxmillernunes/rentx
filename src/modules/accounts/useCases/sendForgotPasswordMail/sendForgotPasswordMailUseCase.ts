import { v4 as uuid } from 'uuid';
import { resolve } from 'node:path';
import { inject, injectable } from 'tsyringe';
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
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

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

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail({
      to: {
        email,
        name: user.name,
      },
      subject: 'Recuperação de senha',
      variables,
      path: templatePath,
    });
  }
}

export { SendForgotPasswordMailUseCase };
