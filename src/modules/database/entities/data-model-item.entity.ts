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
import DataModel from './data-model.entity';

@Entity()
export default class DataModelItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false})
  name: string;

  @Column({ length: 500, nullable: false})
  table_name: string;

  @Column({ type: 'number', nullable: false })
  model_id: number;

  @ManyToOne(type => DataModel, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'model_id'})
  model: DataModel;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
