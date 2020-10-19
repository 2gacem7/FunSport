import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


/**
 * This collection collects all pronotics and the commentary associated
 */
@Schema()
export class Commentary extends Document {

 /**
  * User commentary for this pronostic
  */
 @Prop()
 commentary: string;

 /**
 * User commentary for this pronostic
 */
 @Prop()
 newsId: string;

 /**
  * Id given in the Model<User>
  */
 @Prop()
 userId: string;

 /**
  * date of the creation of the commentary
  */
 @Prop()
 createdAt: string;

 /**
 * boolean true if the commentary is signaled
 */
 @Prop()
 isReported: boolean;


}

/**
 * SchemaFactory for the class <Commentaries>
 */
export const CommentarySchema = SchemaFactory.createForClass(Commentary);
