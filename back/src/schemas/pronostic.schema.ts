import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
/**
 * This collection collects all pronotics and the commentary associated
 */
export class Pronostic extends Document {
  @Prop()
  userId: string;

  @Prop()
  matchId: string;

  @Prop()
  type: string;

  @Prop()
  winnerId: string;

  @Prop()
  commentary: string;

}

export const PronosticSchema = SchemaFactory.createForClass(Pronostic);
