import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

export class CreateMySportDto {

  userId: string;

  sportFavoriteId: string;

  data: [string];

}