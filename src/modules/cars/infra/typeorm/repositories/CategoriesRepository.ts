import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { getRepository, Repository } from 'typeorm';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);

    return category;
  }

  async find(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { id } });

    return category;
  }
}

export { CategoriesRepository };
