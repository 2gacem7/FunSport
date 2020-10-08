import { Controller, Get, Delete,Post,Request, UseGuards,Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MyFavoritesService } from './MyFavorites.service';

@Controller('myfavorites')
export class MyFavoritesController {
    constructor(private readonly myFavoritesService: MyFavoritesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMyFavorite(@Request() req) {
      const list = await this.myFavoritesService.getMyFavorites(req.user.id)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addMyFavorite(@Request() req) {
      let list
      if(req.body.sportFavoriteId, req.body.data){
        list = await this.myFavoritesService.addMyFavorite(req.user.id, req.body.sportFavoriteId, req.body.data)
      } else{
        list = {error:"sportFavoriteId and data are mandatory"}
      }
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delMyFavorite(@Request() req) {
      if (req.body.sportFavoriteId){
        return await this.myFavoritesService.delMyFavorite(req.body.sportFavoriteId)
      } else {
        return {
          error: "sportFavoriteId is mandatory"
        }

    }
    }
}
