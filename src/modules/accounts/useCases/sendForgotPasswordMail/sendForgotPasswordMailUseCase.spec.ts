import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './sendForgotPasswordMailUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { MailProvierInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProvierInMemory;
let dateProvider: DayJsDateProvider;

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Mail', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProvierInMemory();
    dateProvider = new DayJsDateProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );

    await usersRepositoryInMemory.create({
      driver_license: '765872',
      email: 'ivo@ezidi.edu',
      name: 'Steven Schneider',
      password: 'asdqwe',
    });
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await sendForgotPasswordMailUseCase.execute('ivo@ezidi.edu');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an mail if user does not exists', async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute('kaw@rusihhuw.kr');
    }).rejects.toEqual(new AppError('User does not exists'));
  });

  it('Should be able to create an user token', async () => {
    const userToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await sendForgotPasswordMailUseCase.execute('ivo@ezidi.edu');

    expect(userToken).toHaveBeenCalled();
  });
});
