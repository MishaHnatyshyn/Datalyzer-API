import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import Connection from './connection.entity';

@Entity()
export default class DataModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ type: 'number', nullable: false })
  admin_id: number;

  @Column({ type: 'number', nullable: false })
  db_connection_id: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  active: boolean;

  @ManyToOne(type => Connection)
  @JoinColumn({name: 'db_connection_id'})
  db_connection: Connection;

  @ManyToOne(type => User)
  @JoinColumn({name: 'admin_id'})
  admin: User;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
