import { Controller, Get, Delete,Post,Request, UseGuards,Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MySportsService } from './MySports.service';

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
      } else {
        list = {error:"sportId is mandatory"}
      }
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delMySport(@Request() req) {
      if (req.body.sportId){
        return await this.mySportsService.delMySport(req.body.sportId)

      } else {
        return {
          error: "sportId is mandatory"
        }
      }
    }
}
