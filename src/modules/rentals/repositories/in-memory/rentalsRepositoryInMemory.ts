import { Rental } from '@modules/rentals/infra/typeorm/entities/rental';
import { IRentalsRepository } from '../IRentalsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  public async create({
    car_id,
    user_id,
    expected_returned_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_returned_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  public async save(data: Rental): Promise<void> {
    const carIndex = this.rentals.findIndex((rental) => (rental.id = data.id));

    Object.assign(this.rentals[carIndex], data);
  }

  public async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  public async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }

  public async findAtiveRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  public async findAtiveRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
}

export { RentalsRepositoryInMemory };
