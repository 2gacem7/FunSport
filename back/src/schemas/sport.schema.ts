import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sport extends Document {
  @Prop()
  name: string;

}

export const SportSchema = SchemaFactory.createForClass(Sport);