import { Module } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { WidgetsController } from './widgets.controller';
import { Widget, WidgetSchema } from '../schemas/widget.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Widget.name, schema: WidgetSchema }])],
  providers: [WidgetsService],
  controllers: [WidgetsController],
  exports: [WidgetsService],
})
export class WidgetsModule {}
