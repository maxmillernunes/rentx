import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import type { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import upload from '@config/upload';

type IRequest = {
  avatar_file: string;
  user_id: string;
};

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, upload.avatarFolder);
    }

    await this.storageProvider.save(avatar_file, upload.avatarFolder);

    user.setAvatar = avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatarUseCase };
