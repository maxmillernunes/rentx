import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Category[]>> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
