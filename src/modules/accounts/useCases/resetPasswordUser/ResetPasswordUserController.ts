import type { Request, Response } from 'express';
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';
import { container } from 'tsyringe';

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token = request.query.token as string;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute({ password, token });

    return response.status(200).send();
  }
}
export { ResetPasswordUserController };
