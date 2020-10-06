import { IsEmail, Matches , MinLength, ValidateIf} from 'class-validator';

const passwordRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

export class UpdateUserDto {

  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegex)
  @ValidateIf( p => p.password !== "")
  password: string;
}