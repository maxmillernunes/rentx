import { ICreateRentalDTO } from '@modules/rental/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { Rental } from '../entities/rental';
import { Repository, getRepository } from 'typeorm';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findAtiveRentalByCarId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id } });
  }

  async findAtiveRentalByUserId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id } });
  }
}
