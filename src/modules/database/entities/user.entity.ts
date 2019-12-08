import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import UserType from './userType.entity';

@Entity()
export default class Users extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false, unique: true})
  username: string;

  @Column({ length: 500, nullable: false, select: false })
  password?: string;

  @Column({ length: 500, nullable: true})
  description: string;

  @Column()
  user_type_id: number;

  @Column({nullable: true, unique: false})
  created_by_id: number;

  @ManyToOne(type => Users, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'created_by_id'})
  created_by: Users;

  @ManyToOne(type => UserType)
  @JoinColumn({name: 'user_type_id'})
  user_type: UserType;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
