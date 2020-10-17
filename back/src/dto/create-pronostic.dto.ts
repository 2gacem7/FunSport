import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

/**
 * This Dto is used to create a new pronostic.
 */
export class CreatePronosticDto {
  /**
   * Id given in the Model<User>
   */
  userId: string;

  /**
   * Id given by the API
   */
  matchId: string;

  /**
   * Name of the sport
   */
  type: string;

  /**
   * Name of the pronostic winner
   */
  winnerId: string;

  /**
   * User commentary for this pronostic
   */
  @IsOptional()
  commentary: string;

  /**
   * User name
   */
  @IsOptional()
  authorName: string;

  /**
   * date of the creation of the commentary
   */
  @IsOptional()
  createdAt: string;

}
