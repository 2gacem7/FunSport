import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';
/**
 * This Dto is used to create a new MySport.
 */
export class CreateMySportDto {
  /**
   * Id given in the Model<User>
   */
  userId: string;

  /**
   * Id given in the Model<Sport>
   */
  sportFavoriteId: string;

  /**
   * data 
   */
  data: string[];

}
