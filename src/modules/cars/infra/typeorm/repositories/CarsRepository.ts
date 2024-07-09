import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async save(data: Car): Promise<void> {
    await this.repository.save(data);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAllCarsAvailable({
    name,
    brand,
    category_id,
  }: IListCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder('cars');

    carsQuery.where('cars.available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('cars.name ILIKE(:name)', { name: `%${name}%` });
    }

    if (brand) {
      carsQuery.andWhere('cars.brand ILIKE(:brand)', { brand: `%${brand}%` });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', {
        category_id,
      });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ id });

    return car;
  }
}

export { CarsRepository };
