import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able a authenticate user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0001291212',
      email: 'mx@gmail.com',
      name: 'MaxMiller',
      password: 'asdqwe111',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able a authenticate none existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'none-existente@gmail.com',
        password: 'asd',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able a authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '0001291212',
        email: 'mx@gmail.com',
        name: 'MaxMiller',
        password: 'asdqwe111',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'asd',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
