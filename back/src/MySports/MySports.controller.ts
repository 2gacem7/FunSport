import { Controller, Get, Delete, Post, Request, UseGuards, Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MySportsService } from './MySports.service';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common'

/**
 * Controller used for the route 'mysports'
 */
@Controller('mysports')
export class MySportsController {
  constructor(private readonly mySportsService: MySportsService) { }

  /**
   * Controller to get all MySports for a specific user
   * You need to be connected to access to this route
   * @param req
   * @return {Model<MySport>[]}
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMySports(@Request() req) {
    const list = await this.mySportsService.getMySports(req.user.id)
    return list;
  }

  /**
   * Controller to add a sport in the model MySports
   * You need to be connected to access to this route
   * @param req
   * @return {Model<MySport>}
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async addMySport(@Request() req) {
    let list
    if (req.body.sportId) {
      list = await this.mySportsService.addMySport(req.user.id, req.body.sportId)
    }
    else {
      list = {
        error: "sportId is mandatory"
      }
    }
    return list;
  }

  /**
   * Controller to delete a sport to the model MySports
   * @param req
   * @return {}
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delMySport(@Request() req) {
    if (req.body.id) {
      return await this.mySportsService.delMySport(req.body.id)
    } else {
      throw new HttpException({
        message: 'Id is Mandatory',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
