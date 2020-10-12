import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
/**
 * This collection collects all widgets for all users.
 */
export class MyFavorite extends Document {
  /**
   * @param {string} userId
   */
  @Prop()
  userId: string;

  /**
   * @param {string} sportFavoriteId corresponds to a specific id sport
   */
  @Prop()
  sportFavoriteId: string;

  /**
   * @param {string[]} data
   */
  @Prop()
  data: [string];

}

export const MyFavoriteSchema = SchemaFactory.createForClass(MyFavorite);