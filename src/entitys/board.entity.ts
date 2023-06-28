import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatus } from '../boards/board-status.enum';
import { User } from './user.entity';

@Entity('board')
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  status: BoardStatus;

  @ManyToOne(() => User, (x) => x.board, {
    onDelete: 'SET NULL',
    eager: false,
    nullable: true,
  })
  user: User;
}
