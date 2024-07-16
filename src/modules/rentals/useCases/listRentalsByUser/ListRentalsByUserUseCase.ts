import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject(`RentalsRepository`)
    private rentalsRepository: IRentalsRepository
  ) {}
  public async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
