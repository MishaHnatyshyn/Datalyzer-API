import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserType  } from './userType.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ length: 500, nullable: false })
  password: string;

  @OneToOne(type => User)
  @JoinColumn({name: 'created_by_id'})
  created_by: User;

  @OneToOne(type => UserType)
  @JoinColumn({name: 'user_type_id'})
  user_type: UserType;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
