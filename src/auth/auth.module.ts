import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import * as process from 'process';

const jwtConfig = config.get('jwt');
@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
