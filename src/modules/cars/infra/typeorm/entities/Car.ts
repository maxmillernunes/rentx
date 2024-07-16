import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';
import { CarImages } from './CarImages';
import { Rental } from '@modules/rentals/infra/typeorm/entities/rental';

@Entity('cars')
class Car {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  daily_rate: number;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'varchar' })
  license_plate: string;

  @Column({ type: 'int' })
  fine_amount: number;

  @Column({ type: 'varchar' })
  brand: string;

  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification, (specification) => specification.car)
  @JoinTable({
    name: 'specifications_car',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @OneToMany(() => CarImages, (images) => images.car)
  images: CarImages[];

  @OneToMany(() => Rental, (rental) => rental.car)
  rentals: Rental[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };
