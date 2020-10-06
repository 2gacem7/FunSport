import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

export class CreateMyFavoriteDto {

  userId: string;

  sportFavoriteId: string;

  data: string[];

}