import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './createRentalUseCase';

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { expected_returned_date, car_id } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      user_id: id,
      expected_returned_date,
    });

    return response.status(201).json(rental);
  }
}
