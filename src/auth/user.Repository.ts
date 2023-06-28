import { DataSource, Repository } from 'typeorm';
import { User } from '../entitys/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentialsDto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { password } = authCredentialsDto;
    console.log(authCredentialsDto);
    const salt = await bcrypt.genSalt();
    const hashedPassWord = await bcrypt.hash(password, salt);
    const result = this.create({
      loginId: authCredentialsDto.loginId,
      password: hashedPassWord,
      passwordConfirm: hashedPassWord,
      name: authCredentialsDto.name,
      email: authCredentialsDto.email,
      emailConfirm: authCredentialsDto.emailConfirm,
      nickName: authCredentialsDto.nickName,
      age: authCredentialsDto.age,
      sex: authCredentialsDto.sex,
      birth: authCredentialsDto.birth,
    });
    try {
      await this.save(result);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('そのユーザー名は,もう御座います。');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async findUser(loginId: string) {
    const result = this.findOne({
      where: {
        loginId: loginId,
      },
    });
    return result;
  }
  async signIn(
    user,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { loginId } = authCredentialsDto;
    const { name, birth, email } = user;
    if (
      user &&
      (await bcrypt.compare(authCredentialsDto.password, user.password))
    ) {
      // 여기서 유저 토큰을 생성해야 한다.( Secret + PayLoad )
      const payLoad = { loginId, name, birth, email };
      const accessToken = this.jwtService.sign(payLoad);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Login 失敗');
    }
  }
  async usersId() {
    const result = this.createQueryBuilder('user')
      .select('user.login_id')
      .getRawMany();
    return result;
  }
}
