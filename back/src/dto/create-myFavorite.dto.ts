import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

export class CreateMyFavoriteDto {

  userId: string;

  favoriteId: string;

  data: string[];

}