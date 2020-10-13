import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Schema used to collect all sports available in the application
 */
@Schema()
export class Sport extends Document {

  /**
   * name of the sport. 
   */
  @Prop()
  name: string;

}

/**
 * SchemaFactory for the class <Sport>
 */
export const SportSchema = SchemaFactory.createForClass(Sport);
