import { CreateBoardDto } from './create-board-dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto extends CreateBoardDto {
  @IsNotEmpty()
  status: string;
}
