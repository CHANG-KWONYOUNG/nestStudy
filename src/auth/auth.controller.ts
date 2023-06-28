import {
  Body,
  Controller, Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentialsDto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entitys/user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //ValidationPipe signup이라는 핸들러에 값들이 왔을 때 DTO의 값들이 제대로 잘되어있는지 확인하는것이다
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
  @Post('/authUser')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User): void {
    console.log('user : ', user);
  }
  @Get()
  userId() {
    const result = this.authService.usersId();
    return result;
  }
}
