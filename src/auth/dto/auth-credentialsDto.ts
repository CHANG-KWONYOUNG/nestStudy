import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserSexEnum } from '../user-sex/user-sex.enum';
import { Board } from '../../entitys/board.entity';

export class AuthCredentialsDto {
  @MinLength(4, { message: '로그인 아이디는 4글자 이상으로 채워주세요.' })
  @IsNotEmpty({ message: '로그인 아이디를 채워주세요.' })
  loginId: string;

  @IsString({ message: '로그인 아이디를 채워주세요.' })
  @MinLength(4, { message: '비밀번호는 4글자 이상으로 채워주세요.' })
  @MaxLength(20, { message: '비밀번호는 20글자 이하로 채워주세요.' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호 형식이 맞지 않습니다.',
  })
  password: string;

  // @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  // @Matches(/^[a-zA-Z0-9]*$/, {
  //   message: 'パスワードは英語と数字だけになります。',
  // })
  passwordConfirm: string;

  // @IsString()
  // @MinLength(4)
  // @MaxLength(20)
  name: string;

  //@IsString()
  email: string;

  //@IsString()
  emailConfirm: string;

  //@IsString()
  nickName: string;

  //@IsString()
  age: string;

  //@IsString()
  sex: UserSexEnum;

  //@IsString()
  birth: string;

  //@IsString()
  board?: Board[];
}
