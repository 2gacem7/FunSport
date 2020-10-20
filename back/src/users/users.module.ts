import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';;
import { User, UserSchema } from '../schemas/user.schema';
import { MySport, MySportSchema } from '../schemas/mySport.schema';
import { MyFavorite, MyFavoriteSchema } from '../schemas/myFavorite.schema';


/**
 * Module for Model<User>
 */
@Module({
    imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      MongooseModule.forFeature([{ name: MySport.name, schema: MySportSchema }]),
      MongooseModule.forFeature([{ name: MyFavorite.name, schema: MyFavoriteSchema }])

    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
  })
  export class UsersModule {}