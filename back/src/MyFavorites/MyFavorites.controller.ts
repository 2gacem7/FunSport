import { Controller, Get, Delete, Post, Request, UseGuards, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MyFavoritesService } from './MyFavorites.service';

/**
 * Controller used for the route 'myfavorites'
 */
@Controller('myfavorites')
export class MyFavoritesController {
  /**
   * Constructor for MyFavorites controller
   * @param myFavoritesService
   */
  constructor(private readonly myFavoritesService: MyFavoritesService) { }

/**
 * Controller to get all favorites for the current user
 * @param req
 * @return {Model<MyFavorites>}
 */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyFavorite(@Request() req) {
    const list = await this.myFavoritesService.getMyFavorites(req.user.id)
    return list;
  }

 /**
  * Controller to add a favorite
  * You need to be connected to access to this route
  * @param req
  * @return {Model<MyFavorite>}
  */
  @UseGuards(JwtAuthGuard)
  @Post()
  async addMyFavorite(@Request() req) {
    let list
    if (req.body.sportFavoriteId, req.body.data) {
      list = await this.myFavoritesService.addMyFavorite(req.user.id, req.body.sportFavoriteId, req.body.data)
    } else {
      list = { error: "sportFavoriteId and data are mandatory" }
    }
    return list;
  }

  /**
   * Controller to delete a favorite
   * You need to be connected to access to this route
   * @param req
  */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delMyFavorite(@Request() req) {
    if (req.body.sportFavoriteId) {
      return await this.myFavoritesService.delMyFavorite(req.body.sportFavoriteId)
    } else {
      return {
        error: "sportFavoriteId is mandatory"
      }
    }
  }
}
