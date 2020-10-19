import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../schemas/user.schema';

/**
 * This collection collects all news
 */
@Schema()
export class News extends Document {
  /**
   * Title of the news
   */
  @Prop()
  title: string;

  /**
   * Content of the news
   */
  @Prop()
  content: string;

  /**
   * Name of the sport
   */
  @Prop()
  sport: string;

  /**
   * User name
   */
  @Prop()
  author: string;

  /**
   * date of the creation of the news
   */
  @Prop()
  createdAt: number;

  /**
   * date of the update of the news
   */
  @Prop()
  modifiedAt: number;

}

/**
 * SchemaFactory for the class <News>
 */
export const NewsSchema = SchemaFactory.createForClass(News);
