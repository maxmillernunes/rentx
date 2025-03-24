import upload from '@config/upload';
import { Rental } from '@modules/rentals/infra/typeorm/entities/rental';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  driver_license: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @OneToMany(() => Rental, (rental) => rental.user)
  rentals: Rental[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (upload.driver) {
      case 'disk':
        return `${upload.url.disk}/${upload.avatarFolder}/${this.avatar}`;
      case 's3':
        return `${upload.url.s3}/${upload.avatarFolder}/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  set setAvatar(avatar: string) {
    this.avatar = avatar;
  }
}

export { User };
