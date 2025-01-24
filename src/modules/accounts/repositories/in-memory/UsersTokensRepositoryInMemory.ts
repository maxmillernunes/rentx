import type { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import type { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findByUserId(user_id: string): Promise<UserTokens[]> {
    return this.usersTokens.filter(
      (userToken) => userToken.user_id === user_id
    );
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }
  async findByToken(token: string): Promise<UserTokens> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === token
    );
  }
  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.usersTokens.splice(userTokenIndex, 1);
  }
}

export { UsersTokensRepositoryInMemory };
