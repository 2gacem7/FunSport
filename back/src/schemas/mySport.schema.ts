import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MySport extends Document {
  @Prop()
  userId: string;

  @Prop()
  sportId: string;

  @Prop()
  data: [string];
}

export const MySportSchema = SchemaFactory.createForClass(MySport);