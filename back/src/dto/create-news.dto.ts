import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';
import { User } from '../schemas/user.schema';


/**
 * This Dto is used to create a news.
 */
export class CreateNewsDto {
  /**
   * Title of the news
   */
  title: string;

  /**
   * Content of the news
   */
  content: string;

  /**
   * Name of the sport
   */
  sport: string;

  /**
   * User name
   */
  @IsOptional()
  author: User;

  /**
   * date of the creation of the news
   */
  @IsOptional()
  createdAt: string;

  /**
   * date of the update of the news
   */
  @IsOptional()
  modifiedAt: string;

}
