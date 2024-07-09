import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';

class ListAvailableCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query as IListCarsDTO;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      name,
      brand,
      category_id,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarController };
