import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able a list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car1',
      description: 'car description',
      daily_rate: 200,
      license_plate: 'ABC-3420',
      fine_amount: 100,
      brand: 'car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able a list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car1',
      description: 'car description',
      daily_rate: 200,
      license_plate: 'ABC-3420',
      fine_amount: 100,
      brand: 'car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ name: 'car1' });

    expect(cars).toEqual([car]);
  });

  it('Should be able a list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car1',
      description: 'car description',
      daily_rate: 200,
      license_plate: 'ABC-3420',
      fine_amount: 100,
      brand: 'car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: 'car_brand' });

    expect(cars).toEqual([car]);
  });

  it('Should be able a list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car1',
      description: 'car description',
      daily_rate: 200,
      license_plate: 'ABC-3420',
      fine_amount: 100,
      brand: 'car_brand',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
