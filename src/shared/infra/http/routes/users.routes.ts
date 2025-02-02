import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.multer);

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
