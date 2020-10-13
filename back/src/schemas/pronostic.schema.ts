import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * This collection collects all pronotics and the commentary associated
 */
@Schema()
export class Pronostic extends Document {
  /** 
   * id user given in Model<User>
   */
  @Prop()
  userId: string;

  /**
   * id match given in the API used
   */
  @Prop()
  matchId: string;

  /**
   * name of the sport 
   */
  @Prop()
  type: string;

  /**
   * name of the winner
   */
  @Prop()
  winnerId: string;

  /**
   * commentary optional given when a pronostic is send
   */
  @Prop()
  commentary: string;
}

/**
 * SchemaFactory for the class <Pronostic>
 */
export const PronosticSchema = SchemaFactory.createForClass(Pronostic);
