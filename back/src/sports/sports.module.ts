import { Module } from '@nestjs/common';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';
import { Sport, SportSchema } from '../schemas/Sport.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Sport.name, schema: SportSchema }])],
  controllers: [SportsController],
  providers: [SportsService]
})
export class SportsModule {}
