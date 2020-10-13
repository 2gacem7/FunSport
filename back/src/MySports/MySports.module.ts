import { Module } from '@nestjs/common';
import { MySportsService } from './MySports.service';
import { MySportsController } from './MySports.controller';
import { MySport, MySportSchema } from '../schemas/mySport.schema';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Module used for manage all elements necessary to use Model<MySport>
 */

@Module({
  imports:[MongooseModule.forFeature([{ name: MySport.name, schema: MySportSchema }])],
  providers: [MySportsService],
  controllers: [MySportsController],
  exports: [MySportsService],
})
export class MySportsModule {}
