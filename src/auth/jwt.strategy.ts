import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.Repository';
import { User } from '../entitys/user.entity';
import * as config from 'config';
import * as process from 'process';
// 이JwtStrategy사용되기 위해서는 authmodule의 provider항목에 넣어주고 다른곳에서도 이것을 써야하기에
// 익스포트를 시킨다
//이것을 다른곳에서도 쓸수있게끔하는 것이당 아마 밑에 Injectable이친구 덕분에 저절로 토큰을 검사해주는듯..
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // 유저리포지토리를 주입하는이유가 정보를 가져오기위해
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository,
  ) {
    super({
      // app.module에서 토큰을 쓰기위해서 넣었던 스키릿키를 밑에서 유효한지 체크하기 위해서 쓴다.
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      //이토큰을 어디서 가져올지를..
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //토큰이 유효한지 확인되면 실행되는 함수가 발리데이트
  async validate(payload) {
    const { loginId } = payload;
    const user: User = await this.UserRepository.findOne({
      where: { loginId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
