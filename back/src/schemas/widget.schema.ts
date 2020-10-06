import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Widget extends Document {
  @Prop()
  userId: string;

  @Prop()
  widgetId: string;

  @Prop()
  typeWidget: string;


}

export const WidgetSchema = SchemaFactory.createForClass(Widget);