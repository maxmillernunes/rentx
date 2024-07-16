import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { Rental } from '@modules/rentals/infra/typeorm/entities/rental';

type IRequest = {
  id: string;
  user_id: string;
};

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject(`CarsRepository`)
    private carsRepository: ICarsRepository,

    @inject(`RentalsRepository`)
    private rentalsRepository: IRentalsRepository,

    @inject(`DayJsDateProvider`)
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;

    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('This rental does not exists');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_returned_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;

      total = calculateFine;
    }

    total += daily * car.daily_rate;

    Object.assign(rental, { end_date: dateNow, total });

    Object.assign(car, { available: true });

    await this.rentalsRepository.save(rental);
    await this.carsRepository.save(car);

    return rental;
  }
}

export { DevolutionRentalUseCase };
