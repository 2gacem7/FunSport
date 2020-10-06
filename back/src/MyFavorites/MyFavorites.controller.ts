import { Controller, Get, Delete,Post,Request, UseGuards,Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MyFavoritesService } from './MyFavorites.service';

@Controller('myfavorites')
export class MyFavoritesController {
    constructor(private readonly widgetsService: MyFavoritesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getWidget(@Request() req) {
      const list = await this.widgetsService.getMyFavorites(req.user.id)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addWidget(@Request() req) {
      const list = await this.widgetsService.addMyFavorite(req.user.id, req.body.widgetId, req.body.typeWidget)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delWidget(@Request() req) {
       await this.widgetsService.delMyFavorite(req.body.widgetId)
       return {
        message: "Update ok"
    };
    }
}
