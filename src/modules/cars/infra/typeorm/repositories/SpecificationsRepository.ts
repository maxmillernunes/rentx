import { CreateSpecificationsDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { getRepository, In, Repository } from 'typeorm';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: CreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.find({ id: In(ids) });

    return specifications;
  }
}

export { SpecificationsRepository };
