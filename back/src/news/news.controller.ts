import { Body, Controller, Get, Post, Param, Delete,Patch, UseGuards, Request } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';

import { News } from '../schemas/news.schema';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common'

/**
 * Controller used for the route 'news'
 */
@Controller('news')
export class NewsController {
    
  /**
   * Constructor for news controller
   * @param newsService
   * @param usersService
   * @param {Model<Pronostic>} newsModel
   */
  constructor(private readonly newsService: NewsService,
    private readonly usersService: UsersService,
    @InjectModel(News.name) private pronosticModel: Model<News>) { }


  /**
   * Creator of news
   * You need to be connected in admin to access to this route
   * @param {Request}
   * @param {Body} createPronosticDto
   * @return {News}
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createNewsDto: CreateNewsDto) {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
        if (createNewsDto.title && createNewsDto.content && createNewsDto.sport) {
            const user = req.user;
            return await this.newsService.create(user, createNewsDto);
          } else {
            throw new HttpException({
              message: "Title, content and sport are mandatory."
            }, HttpStatus.BAD_REQUEST)
          }
    }
  }

 /**
   * Controller give all news in the database
   * @return {News[]}
   */
  @Get()
  async findAll(): Promise<News[]> {
      return this.newsService.findAll();
  }

  /**
   * Controller give all news in the database
   * @return {News[]}
   */
  @Get(":sport")
  async findBySport(@Param('sport') sport: string): Promise<News[]> {
      return this.newsService.findBySport(sport);
  }

  /**
   * Controller delete a specific news
   * You need to be connected in admin to access to this route
   * @param {string} news id
   * @return  {}
  */
 @UseGuards(JwtAuthGuard)
 @Delete(':id')
 async delete(@Request() req, @Param('id') id: string): Promise<any> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
        if (id) {
            return this.newsService.deleteOne(id);
          } else {
            throw new HttpException({
              message: "id is mandatory"
            }, HttpStatus.BAD_REQUEST)
          }
    }
 }

 /**
   * Controller patch a specific news
   * You need to be connected in admin to access to this route
   * @param {string} news id
   * @return  {}
  */
 @UseGuards(JwtAuthGuard)
 @Patch(':id')
 async patch(@Request() req, @Body() body, @Param('id') id: string): Promise<any> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
        if (id) {
            return this.newsService.patch(id, body);
          } else {
            throw new HttpException({
              message: "id is mandatory"
            }, HttpStatus.BAD_REQUEST)
          }
    }
 }

}
