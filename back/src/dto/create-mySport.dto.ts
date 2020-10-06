import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

export class CreateMySportDto {

  userId: string;

  sportId: string;

  data: [string];

}