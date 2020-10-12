import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
/**
 * This collection collects all sports followed for all users. The propery data is not used
 */
export class MySport extends Document {
  /**
   * @property {string} userId
   */
  @Prop()
  userId: string;


  /**
 * @property {string} sportId
 */
  @Prop()
  sportId: string;

  /**
* @property {string[]} data
*/
  @Prop()
  data: [string];
}

export const MySportSchema = SchemaFactory.createForClass(MySport);