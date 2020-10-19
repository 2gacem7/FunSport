import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';
import { Commentary, CommentarySchema } from '../schemas/commentary.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Commentary.name, schema: CommentarySchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  providers: [CommentariesService],
  controllers: [CommentariesController]
})
export class CommentariesModule {}
