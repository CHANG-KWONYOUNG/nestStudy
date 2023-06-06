import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable() // 주입할수 있다라는 뜻
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoard(): Promise<Board[]> {
    return this.boardRepository.getAllBoard();
  }
  async getBoardByID(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  async deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.UpdateBoard(id, status);
  }
  // private boards: Board[] = [];
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // // 모델의 프로퍼티 이름과 똑같으면 생략 가능
  // createBoards(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // getBoardById(id): Board {
  //   return this.boards.find((board) => board.id === id);
  // }
  //
  // // filter 는 같지않은것은 놔두고 같은 것만 거른다 따가서 !==
  // deleteBoard(id: string): void {
  //   const found: Board = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: string): Board {
  //   const board: Board = this.getBoardById(id);
  //   board.status = <BoardStatus>status;
  //   return board;
  // }
}
