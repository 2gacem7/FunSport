import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';
import { User } from '../schemas/user.schema';


/**
 * This Dto is used to create a new commentary.
 */
export class CreateCommentaryDto {

 /**
  * User commentary for this pronostic
  */
  commentary: string;

  /**
  * User commentary for this pronostic
  */
  newsId: string;

  /**
   * Id given in the Model<User>
   */
  @IsOptional()
  userId: string;

  /**
   * date of the creation of the commentary
   */
  @IsOptional()
  createdAt: string;

  /**
  * boolean true if the commentary is signaled
  */
  @IsOptional()
  isReported: boolean;

}
