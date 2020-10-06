import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

const passwordRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

export class CreateUserDto {

  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegex)
  password: string;
}