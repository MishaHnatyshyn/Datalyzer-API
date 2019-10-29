import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
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

  @Column()
  user_type_id: number;

  @Column({nullable: true})
  created_by_id: number;

  @OneToOne(type => Users)
  @JoinColumn({name: 'created_by_id'})
  created_by: Users;

  @OneToOne(type => UserType)
  @JoinColumn({name: 'user_type_id'})
  user_type: UserType;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
