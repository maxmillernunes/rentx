import type { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import type { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import type { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  token: string;
  password: string;
};

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    //getting the token
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    //Check if the token it is expired.
    const isValid = this.dayJsDateProvider.compareIfBefore(
      userToken.expires_date,
      this.dayJsDateProvider.dateNow()
    );

    if (isValid) {
      throw new AppError('Token expired');
    }

    //Getting the user and update the password with new password
    const user = await this.usersRepository.findById(userToken.user_id);

    const passwordHash = await hash(password, 8);
    user.password = passwordHash;

    await this.usersRepository.save(user);

    // Delete the token used
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
