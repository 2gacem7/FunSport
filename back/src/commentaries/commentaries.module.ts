import { Module } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CommentariesController } from './commentaries.controller';

@Module({
  providers: [CommentariesService],
  controllers: [CommentariesController]
})
export class CommentariesModule {}
