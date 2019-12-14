import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './user.entity';

@Entity()
export default class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ type: 'number', nullable: false })
  user_id: number;

  @ManyToOne(type => Users, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id'})
  user: Users;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
