import { Controller, Get, Delete,Post,Request, UseGuards,Put, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MySportsService } from './MySports.service';
import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'

@Controller('mysports')
export class MySportsController {
    constructor(private readonly mySportsService: MySportsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMySports(@Request() req) {
      const list = await this.mySportsService.getMySports(req.user.id)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addMySport(@Request() req) {
      let list
      if (req.body.sportId){
        list = await this.mySportsService.addMySport(req.user.id, req.body.sportId)
      }
       else {
         list = {
           error: "sportId is mandatory"
         }
       }
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delMySport(@Request() req) {
      if (req.body.id){
        return await this.mySportsService.delMySport(req.body.id)
      } else {
        throw new HttpException({
          message: 'Id is Mandatory',
        }, HttpStatus.BAD_REQUEST);
      }
    }
}
