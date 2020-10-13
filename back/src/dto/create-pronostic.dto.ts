import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';


export class CreatePronosticDto {

  userId: string;

  matchId: string;

  type: string;

  winnerId: string;

  @IsOptional()
  commentary: string;

}
