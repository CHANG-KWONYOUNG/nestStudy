import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentialsDto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassWord = await bcrypt.hash(password, salt);
    const result = this.create({ username, password: hashedPassWord });

    try {
      await this.save(result);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('そのユーザー名は,もう御座います。');
      } else {
        throw new InternalServerErrorException();
      }
      console.log(error);
    }
  }
}
