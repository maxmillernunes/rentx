import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import upload from '@config/upload';
import { deleteFile } from '@utils/file';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IRequest {
  avatar_file: string;
  user_id: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (user.avatar) {
      const avatarFolder = upload.folder('./tmp/avatar', user.avatar);

      await deleteFile(avatarFolder);
    }

    user.setAvatar = avatar_file;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatarUseCase };
