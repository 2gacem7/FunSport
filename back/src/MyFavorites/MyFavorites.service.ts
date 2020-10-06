import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MyFavorite } from '../schemas/myFavorite.schema';
import { CreateMyFavoriteDto } from '../dto/create-myFavorite.dto';



@Injectable()
export class MyFavoritesService {
    constructor( @InjectModel(MyFavorite.name) private myFavoriteModel: Model<MyFavorite>){}

    async getMyFavorites(userId){
        const favorites = await this.myFavoriteModel.find({'userId':userId}).exec();
        return favorites;
    }

    async addMyFavorite(userId,favoriteId){
        const newFavorite = await this.myFavoriteModel.create({'userId':userId, sportFavoriteId:favoriteId,data:[]})
        newFavorite.save()
        return newFavorite
    }

    async delMyFavorite(id){
        await this.myFavoriteModel.findByIdAndDelete(id);
        return {
            message: "Deleted"
        };
    }
}