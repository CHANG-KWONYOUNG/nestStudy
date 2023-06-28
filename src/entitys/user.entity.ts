import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Board } from './board.entity';
import { UserSexEnum } from '../auth/user-sex/user-sex.enum';

@Entity('user')
@Unique('LoginId is Unique', ['loginId'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'login_id', unique: true, nullable: false })
  loginId: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'password_confirm', nullable: true })
  passwordConfirm: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'email_confirm', nullable: true })
  emailConfirm: string;

  @Column({ name: 'nick_name', nullable: true })
  nickName: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  sex: UserSexEnum;

  @Column({ nullable: true })
  birth: string;

  @OneToMany(() => Board, (x) => x.id, {
    onDelete: 'SET NULL',
    eager: false,
  })
  @JoinColumn({
    name: 'id',
  })
  board: Board[];
}
