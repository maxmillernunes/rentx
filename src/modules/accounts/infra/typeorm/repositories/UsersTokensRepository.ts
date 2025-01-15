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

  async findByUserId(user_id: string): Promise<UserTokens[]> {
    const tokens = await this.repository.find({
      where: {
        user_id
      }
    });

    return tokens;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const tokens = await this.repository.findOne({
      where: {
        user_id,
        refresh_token
      }
    });

    return tokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { UsersTokensRepository };
