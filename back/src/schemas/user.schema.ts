import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  mySports: string[];

  @Prop()
  myFavorites: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);