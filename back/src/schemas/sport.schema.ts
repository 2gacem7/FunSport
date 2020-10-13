import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
/**
 * This collection collects all sports available in the application
 */
export class Sport extends Document {
  @Prop()
  name: string;

}

export const SportSchema = SchemaFactory.createForClass(Sport);