import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from '../entitys/board.entity';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from '../entitys/user.entity';
import { UpdateBoardDto } from './dto/update-board-dto';

export class BoardRepository extends Repository<Board> {
  constructor(@InjectRepository(Board) private dataSource: DataSource) {
    super(Board, dataSource.manager);
  }
  async getAllBoard() {
    const query = await this.createQueryBuilder('board');
    // return query.getManyAndCount().then((result) => {
    //   return { data: result[0], count: result[1] };
    // });
    return query.getMany();
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  async pageNation(index: number, sort: any, order: any) {
    const query = await this.createQueryBuilder('board');
    query.skip(index * 5).take(5);
    if (sort && order) {
      query.orderBy('board.' + sort, order);
    }
    return query.getManyAndCount().then((result) => {
      return { data: result[0], count: result[1] };
    });
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
    const result = await this.createQueryBuilder()
      .delete()
      .from(Board)
      .where({ id })
      .execute();
    if ((await result).affected === 0) {
      throw new NotFoundException(`Can't find Board wit id ${id}`);
    }

    console.log('result :', result);
  }

  async UpdateBoard(
    id: number,
    UpdateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const foundBoardId = await this.getBoardById(id);
    foundBoardId.title = UpdateBoardDto.title;
    foundBoardId.description = UpdateBoardDto.description;
    foundBoardId.status = <BoardStatus>UpdateBoardDto.status;

    await this.save(foundBoardId);

    return foundBoardId;
  }
}
