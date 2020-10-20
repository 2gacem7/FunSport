import { IsEmail, Matches , MinLength, ValidateIf} from 'class-validator';

/**
 * Regex used to check if password is validated.
 */
const passwordRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

/**
 * This Dto is used to update a users.
 */
export class UpdateUserDto {
/**
   * firstname of the user
   */
  @MinLength(1)
  firstName: string;

  /**
   * Lastname of the user
   */
  @MinLength(1)
  lastName: string;

  /**
   * Email of the user
   */
  @IsEmail()
  email: string;

  /**
   * Phone of the user (min 10)
   */
  @MinLength(10)
  phone: string;

  /**
   * Password of the user using regex only if password !=''
   */
  @Matches(passwordRegex)
  @ValidateIf( p => p.password !== "")
  password: string;
}