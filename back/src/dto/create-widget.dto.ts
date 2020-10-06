import { IsEmail, Matches , MinLength, IsOptional} from 'class-validator';

export class CreateWidgetDto {

  userId: string;

  widgetId: string;

  typeWidget: string;

}