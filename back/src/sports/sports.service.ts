import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sport } from '../schemas/Sport.schema';
import { CreateMySportDto } from '../dto/create-mySport.dto';
import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'


@Injectable()
export class SportsService {
    constructor( @InjectModel(Sport.name) private SportModel: Model<Sport>){}

    async getSport(id){
        try {
            const sport = await this.SportModel.findById(id).orFail();
            return sport;
        } catch (error) {
            throw new HttpException({
                message: 'Invalid Sport ID',
              }, HttpStatus.BAD_REQUEST);
        }
    }

    async addSport(name){
        const newSport = await this.SportModel.create({name: name});
        newSport.save()
        return newSport
    }

    async delSport(sportId){
        // del a sport in your mySports array.
        // :sportId = id extract to the API
        // return JSON
        await this.SportModel.findByIdAndDelete(sportId);
        return {
            message: "Deleted ok"
        };
    }
}
