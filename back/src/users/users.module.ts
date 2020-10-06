import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';;
import { User, UserSchema } from '../schemas/user.schema';
import { Widget, WidgetSchema } from '../schemas/widget.schema';


@Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      MongooseModule.forFeature([{ name: Widget.name, schema: WidgetSchema }])

    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
  })
  export class UsersModule {}