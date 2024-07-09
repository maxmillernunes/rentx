import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new car', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    expect(car).toHaveProperty('id');
  });

  it('should be able to create a new car available', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    const car = await createCarUseCase.execute({
      name: 'Name car available',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    expect(car).toHaveProperty('id');
    expect(car.available).toBe(true);
  });

  it('not should be able to create a new car with existing license plate', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: 'new category',
      name: 'new Category',
    });

    await createCarUseCase.execute({
      name: 'Name car1',
      description: 'Description car',
      daily_rate: 20,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: category.id,
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car2',
        description: 'Description car',
        daily_rate: 20,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: category.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
