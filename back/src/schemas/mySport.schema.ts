import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * This collection collects all sports followed for all users. The propery data is not used
 */
@Schema()
export class MySport extends Document {
  /**
   * id user given in the Model<User> 
   */
  @Prop()
  userId: string;


  /**
   * id sport given in the Model<Sport>
   */
  @Prop()
  sportId: string;

  /**
   *  data
   */
  @Prop()
  data: [string];
}

/**
 * SchemaFactory for the class <MySport>
 */
export const MySportSchema = SchemaFactory.createForClass(MySport);
