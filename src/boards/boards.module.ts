import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
  imports: [TypeOrmModule.forFeature([Board])],
})
export class BoardsModule {}
