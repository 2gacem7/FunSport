import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MyFavorite } from '../schemas/myFavorite.schema';
import { CreateWidgetDto } from '../dto/create-myFavorite.dto';



@Injectable()
export class MyFavoritesService {
    constructor( @InjectModel(MyFavorite.name) private myFavoriteModel: Model<MyFavorite>){}

    async getMyFavorites(userId){
        const widgets = await this.myFavoriteModel.find({'userId':userId}).exec();
        return widgets;
    }

    async addMyFavorite(userId,widgetId, typeWidget){
        const newWidget = await this.myFavoriteModel.create({'userId':userId, widgetId: widgetId,typeWidget:typeWidget});
        newWidget.save()
        return newWidget
    }

    async delMyFavorite(widgetId){
        await this.myFavoriteModel.deleteOne({'widgetId':widgetId});
        return {
            message: "Update ok"
        };
    }
}