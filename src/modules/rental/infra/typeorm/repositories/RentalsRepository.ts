import { ICreateRentalDTO } from '@modules/rental/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rental/repositories/IRentalsRepository';
import { Rental } from '../entities/rental';
import { IsNull, Repository, getRepository } from 'typeorm';

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

  async save(rental: Rental): Promise<void> {
    await this.repository.save(rental);
  }

  async findAtiveRentalByCarId(car_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });
  }

  async findAtiveRentalByUserId(user_id: string): Promise<Rental> {
    return await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { id } });
  }
}
