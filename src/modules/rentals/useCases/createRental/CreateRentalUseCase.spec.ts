import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/rentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

let createRentalUseCase: CreateRentalUseCase;

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

let dayjsDateProvider: DayJsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();

    dayjsDateProvider = new DayJsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it('should be able a create a new rental', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    const rental = await createRentalUseCase.execute({
      user_id: 'ada',
      car_id: car.id,
      expected_returned_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able a create a new rental if there open to the same user', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    await createRentalUseCase.execute({
      user_id: 'ada',
      car_id: car.id,
      expected_returned_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'ada',
        car_id: car2.id,
        expected_returned_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able a create a new rental if there open to the same car', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    await createRentalUseCase.execute({
      user_id: 'ada',
      car_id: car.id,
      expected_returned_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'adas',
        car_id: car.id,
        expected_returned_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able a create a new rental with the time is less than 24 hours', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'adas',
        car_id: car.id,
        expected_returned_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
