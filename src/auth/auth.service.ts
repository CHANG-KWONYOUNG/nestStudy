import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.Repository';
import { AuthCredentialsDto } from './dto/auth-credentialsDto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return await this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findUser(authCredentialsDto.loginId);
    const result = await this.userRepository.signIn(user, authCredentialsDto);
    return result;
  }
  async usersId() {
    const result = await this.userRepository.usersId();
    return result;
  }
}
