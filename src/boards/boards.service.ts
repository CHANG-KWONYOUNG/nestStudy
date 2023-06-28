import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from '../entitys/board.entity';
import { User } from '../entitys/user.entity';
import { UpdateBoardDto } from './dto/update-board-dto';

@Injectable() // 주입할수 있다라는 뜻
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoard() {
    return this.boardRepository.getAllBoard();
  }
  async getBoardByID(id: number): Promise<Board> {
    return await this.boardRepository.getBoardById(id);
  }
  async pageNation(index: number, sort: any, order: any) {
    return this.boardRepository.pageNationtion(+index, sort, order);
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  async deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  async updateBoardStatus(
    id: number,
    UpdateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardRepository.UpdateBoard(id, UpdateBoardDto);
  }
}
