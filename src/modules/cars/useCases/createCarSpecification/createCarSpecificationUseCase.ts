import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

type IRequest = {
  car_id: string;
  specifications_id: string[];
};

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carsAlreadyExist = await this.carsRepository.findById(car_id);

    if (!carsAlreadyExist) {
      throw new AppError('Car does not exist', 409);
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carsAlreadyExist.specifications = specifications;

    await this.carsRepository.save(carsAlreadyExist);

    return carsAlreadyExist;
  }
}

export { CreateCarSpecificationUseCase };
