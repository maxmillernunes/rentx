import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  car_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'timestamp', default: 'now()' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'timestamp' })
  expected_returned_date: Date;

  @Column({ type: 'numeric', nullable: true })
  total: number;

  @ManyToOne(() => Car, (car) => car.rentals)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental };
