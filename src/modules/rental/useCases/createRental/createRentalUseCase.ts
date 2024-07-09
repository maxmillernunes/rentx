import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rental/infra/typeorm/entities/rental';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

type IRequest = {
  user_id: string;
  car_id: string;
  expected_returned_date: Date;
};

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject(`CarsRepository`)
    private carsRepository: ICarsRepository,

    @inject(`RentalsRepository`)
    private rentalsRepository: IRentalsRepository,

    @inject(`DayJsDateProvider`)
    private dateProvider: IDateProvider
  ) {}
  public async execute({
    user_id,
    car_id,
    expected_returned_date,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;
    const carsAvailable = await this.carsRepository.findById(car_id);

    if (!carsAvailable.available) {
      throw new AppError('Cars is not available', 400);
    }

    const carWithActiveRental =
      await this.rentalsRepository.findAtiveRentalByCarId(car_id);

    if (carWithActiveRental) {
      throw new AppError('Cars with active rental', 400);
    }

    const userWithActiveRental =
      await this.rentalsRepository.findAtiveRentalByUserId(user_id);

    if (userWithActiveRental) {
      throw new AppError('There`s a rental in progress fot user', 400);
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_returned_date
    );

    if (compare < minimumHours) {
      throw new AppError('Invalid return time', 400);
    }

    const retal = await this.rentalsRepository.create({
      car_id,
      expected_returned_date,
      user_id,
    });

    return retal;
  }
}

export { CreateRentalUseCase };
