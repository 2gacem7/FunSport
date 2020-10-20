import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * This collection collects all users
 */
@Schema()
export class User extends Document {
  /**
   * firstname of the user
   */
  @Prop()
  firstName: string;

  /**
   * Lastname of the user
   */
  @Prop()
  lastName: string;

  /**
   * Email of the user
   */
  @Prop()
  email: string;

  /**
   * Password of the user
   */
  @Prop()
  password: string;

  /**
   * Phone of the user
   */
  @Prop()
  phone: string;

  /**
   * Status administrator for this user
   */
  @Prop()
  isAdmin: boolean;

}
/**
 * SchemaFactory for the class <User>
 */
export const UserSchema = SchemaFactory.createForClass(User);