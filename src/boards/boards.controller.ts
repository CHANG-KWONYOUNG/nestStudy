import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
  Put,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board-dto';
import { Board } from '../entitys/board.entity';
import { UpdateBoardDto } from './dto/update-board-dto';

@Controller('board')
export class BoardsController {
  private Logger = new Logger('BoardControllerが実行されています。');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard() {
    // this.Logger.verbose(`User ${user.username} trying to get all board`);
    return this.boardsService.getAllBoard();
  }
  @Get('table')
  pageNation(
    @Query('index') index?: number,
    @Query('sort') sort?: any,
    @Query('order') order?: any,
  ) {
    return this.boardsService.pageNation(+index - 1, sort, order);
  }
  @Get(':id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardByID(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(CreateBoardDto);
  }
  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Put(':id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoardStatus(id, UpdateBoardDto);
  }
}
