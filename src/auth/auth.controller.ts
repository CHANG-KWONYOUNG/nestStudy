import { Body, Controller, Post, Req, ValidationPipe } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentialsDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  test(@Req() req) {
    console.log('req : ', req);
  }
}
