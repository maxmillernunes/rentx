import auth from '@config/auth';
import type { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import type { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

type IPayload = {
  sub: string;
  email: string;
};

type ITokenResponse = {
  token: string;
  refresh_token: string;
};

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dayJsDateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    // check if the token is valid
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    // If exists, remove the old refresh token
    await this.usersTokensRepository.deleteById(userToken.id);

    // Creating the new refresh token
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dayJsDateProvider.addDays(
      auth.expires_in_refresh_token_day
    );

    // save the new refresh token
    await this.usersTokensRepository.create({
      user_id: user_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { token: newToken, refresh_token };
  }
}
