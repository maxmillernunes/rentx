import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/rental';

export interface IRentalsRepository {
  findAtiveRentalByCarId(car_id: string): Promise<Rental>;
  findAtiveRentalByUserId(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  save(data: Rental): Promise<void>;
}
