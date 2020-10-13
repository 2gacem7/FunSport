import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * This collection collects all widgets for all users.
 */
@Schema()
export class MyFavorite extends Document {
  /**
   * id user given in Model<User>
   */
  @Prop()
  userId: string;

  /**
   * sportFavoriteId corresponds to a specific id sport
   */
  @Prop()
  sportFavoriteId: string;

  /**
   * data
   */
  @Prop()
  data: [string];

}

/**
 * SchemaFactory for the class <MyFavorite>
 */
export const MyFavoriteSchema = SchemaFactory.createForClass(MyFavorite);
