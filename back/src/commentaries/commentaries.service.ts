import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Commentary} from '../schemas/commentary.schema';
import { HttpException, HttpStatus } from '@nestjs/common'

import { CreateCommentaryDto } from '../dto/create-commentary.dto';
import { User } from '../schemas/user.schema';

/**
 * Service used to manage all action available in Commentaries Service
 */
@Injectable()
export class CommentariesService {

 /**
   * Constructor for NewsService
   */
  constructor(@InjectModel(Commentary.name) private commentaryModel: Model<Commentary>,
  @InjectModel(User.name) private userModel: Model<User>,
  ) {
  }
  /**
   * Service used to create a news
   * You need to be connected in admin to access to this route
   * @param {User} userId
   * @param {CreateCommentaryDto} createCommentaryDto
   * @return {Commentary}
   */
  async create(user: User, createCommentaryDto: CreateCommentaryDto): Promise<Commentary> {
    const createdCommentary = await new this.commentaryModel({
      commentary: createCommentaryDto.commentary,
      userId: user.id,
      newsId: createCommentaryDto.newsId,
      createdAt: Date.now(),
      isReported: false
    })
    return createdCommentary.save();
  } 

/**
 * Service used to give all news in the database
 * @return {News[]}
 */
  async findAllReported(): Promise<any> {
    let commentary = await this.commentaryModel.find({isReported:true});
    for (let i = 0; i < commentary.length; i++){
        let firstName = await this.userModel.findById(commentary[i].userId).select('firstName');
        let lastName = await this.userModel.findById(commentary[i].userId).select('lastName');
        commentary[i].userId = firstName.firstName + " " + lastName.lastName;
      }
    return commentary;
  }

/**
 * Service used to give all news in the database
 * @return {News[]}
 */
async findAll(newsId): Promise<any> {
    let commentary = await this.commentaryModel.find({newsId: newsId});
    for (let i = 0; i < commentary.length; i++){
        let firstName = await this.userModel.findById(commentary[i].userId).select('firstName');
        let lastName = await this.userModel.findById(commentary[i].userId).select('lastName');
        commentary[i].userId = firstName.firstName + " " + lastName.lastName;
      }
    return commentary;
  }

 /**
  * Service used to delete
  * You need to be connected to access to this route and to be isAdmin
  * @param {String} commentaryId id of the commentary
  * @return  {Commentary}
  */
 async deleteCommentary(commentaryId) {
    let result = await this.commentaryModel.findByIdAndDelete(commentaryId);
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
  * Service used to validate a commentary
  * You need to be connected to access to this route and to be isAdmin
  * @param {String} commentaryId id of the commentary
  * @return  {Commentary}
  */
  async validateCommentary(commentaryId) {
    const newCommentary = await this.commentaryModel.findById(commentaryId);
    newCommentary.isReported = false
    return newCommentary.save();

  }


  /**
  * Service used to report a commentary
  * You need to be connected to access to this route
  * @param {String} pronosticId id of the pronostic
  * @return  {Pronostic}
  */
  async reportCommentary(pronosticId) {
    const newPronostic = await this.commentaryModel.findById(pronosticId);
    newPronostic.isReported = true
    return newPronostic.save();
  }


}


