import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Car } from './Car';
import { v4 as uuid } from 'uuid';

@Entity('cars_images')
class CarImages {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  car_id: string;

  @Column({ type: 'varchar' })
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { CarImages };
