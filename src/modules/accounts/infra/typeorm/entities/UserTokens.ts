import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { v4 as uuid } from 'uuid';

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  refresh_token: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp' })
  expires_date: Date;

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

export { UserTokens };
