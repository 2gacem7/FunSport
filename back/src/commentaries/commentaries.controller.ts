import { Body, Controller, Get, Post, Param, Delete,Patch, UseGuards, Request } from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from '../dto/create-commentary.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';

import { Commentary } from '../schemas/commentary.schema';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common'

/**
 * Service used to manage all action available in Commentaries Service
 */
@Controller('commentaries')
export class CommentariesController {
    /**
   * Constructor for commentaries controller
   * @param commentariesService
   * @param usersService
   * @param {Model<Commentary>} commentaryModel
   */
  constructor(private readonly commentariesService: CommentariesService,
    private readonly usersService: UsersService,
    @InjectModel(Commentary.name) private commentaryModel: Model<Commentary>) { }

  /**
   * Creator of commentary
   * You need to be connected to access to this route
   * @param {Request}
   * @param {Body} createCommentaryDto
   * @return {Commentary}
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createCommentaryDto: CreateCommentaryDto) {
    if (createCommentaryDto.commentary && createCommentaryDto.newsId) {
        const user = req.user;
        return await this.commentariesService.create(user, createCommentaryDto);
        } else {
        throw new HttpException({
            message: "Commentary and news ID are mandatory."
        }, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * Service used to give all commentary reported true in the database
   * You need to be connected to access to this route and to be isAdmin
   * @return {Commentary[]}
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllReported(@Request() req): Promise<Commentary[]> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
        return this.commentariesService.findAllReported();
    }
  }

  /**
   * Service used to give all commentary for one newsId true in the database
   * @return {Commentary[]}
   */
  @Get(":newsId")
  async findAll(@Param('newsId') newsId: string): Promise<Commentary[]> {
      return this.commentariesService.findAll(newsId);
  }

/**
 * Controller used to reset the field commentary for a specific pronostic
 * You need to be connected to access to this route and to be isAdmin
 * @return {Pronotic}
 */
@UseGuards(JwtAuthGuard)
@Delete(':commentaryId/delete')
async deleteCommentary(@Request() req, @Param('commentaryId') commentaryId: string): Promise<any> {
  const isAdmin = await this.usersService.isAdmin(req.user.id);
  if (!isAdmin) {
    throw new HttpException({
      message: 'Unauthorized Access',
    }, HttpStatus.UNAUTHORIZED);
  }
  else {
    return this.commentariesService.deleteCommentary(commentaryId);
  }
}

 /**
* Controller used to validate a commentary
* You need to be connected to access to this route and to be isAdmin
* @return {Pronotic}
*/
@UseGuards(JwtAuthGuard)
@Get(':commentaryId/validate')
async validateCommentary(@Request() req, @Param('commentaryId') commentaryId: string): Promise<Commentary> {
const isAdmin = await this.usersService.isAdmin(req.user.id);
if (!isAdmin) {
  throw new HttpException({
    message: 'Unauthorized Access',
  }, HttpStatus.UNAUTHORIZED);
}
else {
  return this.commentariesService.validateCommentary(commentaryId);
}
}

 /**
* Controller used to report a specific commentary
* You need to be connected to access to this route
* @return {Pronotic}
*/
@UseGuards(JwtAuthGuard)
@Get(':commentaryId/report')
async reportCommentary( @Param('commentaryId') commentaryId: string): Promise<Commentary> {
return this.commentariesService.reportCommentary(commentaryId);

}
}