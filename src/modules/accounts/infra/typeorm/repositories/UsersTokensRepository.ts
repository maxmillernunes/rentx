import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UserTokens';
import { getRepository, Repository } from 'typeorm';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data);

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
