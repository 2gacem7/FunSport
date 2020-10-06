import { Controller, Get, Delete,Post,Request, UseGuards,Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MyFavoritesService } from './MyFavorites.service';

@Controller('myfavorites')
export class MyFavoritesController {
    constructor(private readonly myFavoritesService: MyFavoritesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getWidget(@Request() req) {
      const list = await this.myFavoritesService.getMyFavorites(req.user.id)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addWidget(@Request() req) {
      const list = await this.myFavoritesService.addMyFavorite(req.user.id, req.body.sportFavoriteId)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delWidget(@Request() req) {
       await this.myFavoritesService.delMyFavorite(req.body.widgetId)
       return {
        message: "Update ok"
    };
    }
}
