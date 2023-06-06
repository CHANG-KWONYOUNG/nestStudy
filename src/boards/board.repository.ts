import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';

export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager);
  }
  async getAllBoard(): Promise<Board[]> {
    return await this.find();
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = this.delete(id);
    if ((await result).affected === 0) {
      throw new NotFoundException(`Can't find Board wit id ${id}`);
    }
    console.log('result :', result);
  }

  async UpdateBoard(id: number, status: BoardStatus): Promise<Board> {
    const foundBoardId = await this.getBoardById(id);
    foundBoardId.status = status;

    await this.save(foundBoardId);

    return foundBoardId;
  }
}
