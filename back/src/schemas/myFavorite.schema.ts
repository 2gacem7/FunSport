import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MyFavorite extends Document {
  @Prop()
  userId: string;

  @Prop()
  favoriteId: string;

  @Prop()
  data: string[];


}

export const MyFavoriteSchema = SchemaFactory.createForClass(MyFavorite);