import { Controller, Get, Delete,Post,Request, UseGuards,Put, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SportsService } from './sports.service';

import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'

@Controller('sports')
export class SportsController {
    constructor(private readonly SportsService: SportsService) {}
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getSport(@Param('id') id: string) {
      const sport = await this.SportsService.getSport(id)
      return sport;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addSport(@Request() req) {
      let list
      if (req.body.name){
        list = await this.SportsService.addSport(req.body.name)
      }
       else {
        throw new HttpException({
            message: 'Name is Mandatory',
          }, HttpStatus.BAD_REQUEST);
       }
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delSport(@Request() req) {
      if (req.body.id){
        return await this.SportsService.delSport(req.body.id)
      } else {
        throw new HttpException({
            message: 'Id is Mandatory',
          }, HttpStatus.BAD_REQUEST);
      }
    }
}
