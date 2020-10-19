import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News} from '../schemas/news.schema';
import { HttpException, HttpStatus } from '@nestjs/common'

import { CreateNewsDto } from '../dto/create-news.dto';
import { User } from '../schemas/user.schema';
import { title } from 'process';



/**
 * Service used to manage all action available in NewsService
 */
@Injectable()
export class NewsService {

 /**
   * Constructor for NewsService
   */
  constructor(@InjectModel(News.name) private newsModel: Model<News>,
  @InjectModel(User.name) private userModel: Model<User>,
  ) {
  }
  /**
   * Service used to create a news
   * You need to be connected in admin to access to this route
   * @param {User} userId
   * @param {CreateNewsDto} createNewsDto
   * @return {News}
   */
  async create(user: User, createNewsDto: CreateNewsDto): Promise<News> {
    const createdPronostic = await new this.newsModel({
      title: createNewsDto.title,
      content: createNewsDto.content,
      sport: createNewsDto.sport,
      author: user.firstName + " " + user.lastName,
      createdAt: Date.now(),
    })
    return createdPronostic.save();
  }

  /**
   * Service used to give all news in the database
   * @return {News[]}
   */
  async findAll(): Promise<any> {
    return this.newsModel.find();
  }

  /**
   * Service used to give all news for one sport in the database
   * @return {News[]}
   */
  async findBySport(sport): Promise<any> {
    return this.newsModel.find({ 'sport': sport});
  }

   /**
   * Service used to delete a specific pronostic
   * You need to be connected to access to this route
   * @param {string} id pronostic id
   * @returns  {JSON}
   */
  async deleteOne(id): Promise<any> {
    const result = await this.newsModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException({
        message: 'No news deleted',
      }, HttpStatus.BAD_REQUEST);
    }
    else return {
      message: "News Deleted !",
    }
  }

  /**
   * Service used to patch a specific news
   * You need to be connected in admin to access to this route
   * @param {string} id news id
   * @returns  {JSON}
   */
  async patch(id, body): Promise<any> {
    const news = await this.newsModel.findById(id);
    let newsUpdated = news;
    let updated = true;
    
    if (body.hasOwnProperty("title")){
      newsUpdated = await this.newsModel.findByIdAndUpdate( id,{"title": body.title},{new:true,useFindAndModify:false}); 
      updated = true;
    }
    if (body.hasOwnProperty("content")){
      newsUpdated = await this.newsModel.findByIdAndUpdate( id,{"content": body.content},{new:true,useFindAndModify:false});
      updated = true;
    }
    if (body.hasOwnProperty("sport")){
      newsUpdated = await this.newsModel.findByIdAndUpdate( id,{"sport": body.sport},{new:true,useFindAndModify:false}); 
      updated = true;
    } 
    if(updated){
      newsUpdated = await this.newsModel.findByIdAndUpdate( id,{"modifiedAt": Date.now()},{new:true,useFindAndModify:false}); 
      return newsUpdated;
    }
    else{
      throw new HttpException({
        message: 'Nothing Updated',
      }, HttpStatus.BAD_REQUEST);
    }
  }
  
}
