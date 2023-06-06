import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'Chang-KwonYoung',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
  ],
})
export class AppModule {}
