import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MyFavorite } from '../schemas/myFavorite.schema';
import { CreateMyFavoriteDto } from '../dto/create-myFavorite.dto';


/**
 * Service used for managing the actions available in Model<MyFavorite>
 */

@Injectable()
export class MyFavoritesService {
    /**
     * Constructor of MyFavoritesService
     * @param {Model<MyFavorite>} myFavoriteModel
     */
    constructor( @InjectModel(MyFavorite.name) private myFavoriteModel: Model<MyFavorite>){}

    /**
     * Service used to get all favorites for the current user
     * @param {string} userId
     * @return {Model<MyFavorite>}
     */
    async getMyFavorites(userId:string){
        const favorites = await this.myFavoriteModel.find({'userId':userId}).exec();
        return favorites;
    }

    /**
     * Service used to add a favorite for the current user
     * @param {string} userId
     * @param {string} favoriteId
     * @param {string[]} data
     * @return {Model<MyFavorite>}
     */
    async addMyFavorite(userId,favoriteId, data){
        const newFavorite = await this.myFavoriteModel.create({'userId':userId, sportFavoriteId:favoriteId,data:data})
        newFavorite.save()
        return newFavorite
    }

    /**
     * Service used to delete a specific favorite
     * @param {string} id
     * @return {}
     */
    async delMyFavorite(id){
        await this.myFavoriteModel.findByIdAndDelete(id);
        return {
            message: "Deleted"
        };
    }
}
