import { instanceToPlain } from 'class-transformer';
import type { User } from '../infra/typeorm/entities/User';
import type { IUserResponseDTO } from '../dtos/IUserResponseDTO';

class UserMap {
  static toDTO(user: User): IUserResponseDTO {
    const userMap = instanceToPlain({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      driver_license: user.driver_license,
      avatar_url: user.avatar_url,
    }) as IUserResponseDTO;

    return userMap;
  }
}

export { UserMap };
