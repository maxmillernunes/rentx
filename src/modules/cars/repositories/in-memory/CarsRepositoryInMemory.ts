import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';
import { IListCarsDTO } from '@modules/cars/dtos/IListCarsDTO';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async save(data: Car): Promise<void> {
    const carIndex = this.cars.findIndex((car) => (car.id = data.id));

    Object.assign(this.cars[carIndex], data);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAllCarsAvailable({
    name,
    brand,
    category_id,
  }: IListCarsDTO): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => {
      if (
        car.available === true ||
        (name && car.name) ||
        (brand && car.brand) ||
        (category_id && car.category_id)
      ) {
        return car;
      }

      return null;
    });

    return carsAvailable;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }
}

export { CarsRepositoryInMemory };
