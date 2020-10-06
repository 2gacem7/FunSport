import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MyFavorite extends Document {
  @Prop()
  userId: string;

  @Prop()
  widgetId: string;

  @Prop()
  typeWidget: string;


}

export const MyFavoriteSchema = SchemaFactory.createForClass(MyFavorite);