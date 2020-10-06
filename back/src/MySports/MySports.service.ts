import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MySport } from '../schemas/mySport.schema';
import { CreateWidgetDto } from '../dto/create-myFavorite.dto';


@Injectable()
export class MySportsService {
    constructor( @InjectModel(MySport.name) private mySportModel: Model<MySport>){}

    async getMySports(userId){
        // get all sports for a specific userId.
        // Populate the data with the API TODO
        // :userId
        // return Model<MySport>
        const datas = await this.mySportModel.findById(userId);
        // for(let i =0; i<datas.length;i++){
            // TODO
        // }
        return datas;
    }

    async addMySport(userId){
        // add a sport in your mySports array.
        // :userId
        // :sportId = id extract to the API
        // return Model<MySport>
        const newMySport = await this.mySportModel.create({'userId':userId, 'data':[]});
        newMySport.save()
        return newMySport
    }

    async delMySport(sportId){
        // del a sport in your mySports array.
        // :sportId = id extract to the API
        // return JSON
        await this.mySportModel.findByIdAndDelete(sportId);
        return {
            message: "Deleted ok"
        };
    }
}