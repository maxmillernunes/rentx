import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  name?: string;
  brand?: string;
  category_id?: string;
};

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllCarsAvailable({
      name,
      brand,
      category_id,
    });

    return cars;
  }
}

export { ListAvailableCarsUseCase };
