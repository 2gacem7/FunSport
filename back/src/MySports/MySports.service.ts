import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MySport } from '../schemas/mySport.schema';
import { CreateMySportDto } from '../dto/create-mySport.dto';


@Injectable()
export class MySportsService {
    constructor( @InjectModel(MySport.name) private mySportModel: Model<MySport>){}
    /**
     * Service used to get all sports for a specific user
     * @param {string} userId
     * @return {Model<MySport>[]}
     */
    async getMySports(userId){
        const datas = await this.mySportModel.find({userId:userId}).exec();
        return datas;
    }

    /**
     * Service used to add a sport in the user's favorite
     * @param {string} userId
     * @param {string} sportId
     * @return {Model<MySport>}
     */
    async addMySport(userId, sportId){
        const newMySport = await this.mySportModel.create({userId:userId, sportId:sportId, data:[]});
        newMySport.save()
        return newMySport
    }

    /**
     * Service used to delete a sport in the user's favorite
     * @param {string} sportId
     * @return {}
     */
    async delMySport(sportId){
        await this.mySportModel.findByIdAndDelete(sportId);
        return {
            message: "Deleted ok"
        };
    }
}