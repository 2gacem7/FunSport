import { IsEmail, Matches , MinLength, ValidateIf} from 'class-validator';

const passwordRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

export class UpdateUserDto {

  @MinLength(1)
  firstName: string;

  @MinLength(1)
  lastName: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegex)
  @ValidateIf( p => p.password !== "")
  password: string;
}