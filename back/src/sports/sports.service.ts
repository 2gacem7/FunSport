import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sport } from '../schemas/sport.schema';
import { CreateMySportDto } from '../dto/create-mySport.dto';
import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'


/**
 * Service used for managing the actions available in Model<Sport>
 */
@Injectable()
export class SportsService {
    /**
     * Constructor of SportsService
     * @param {Model<Sport>} SportModel
     */
    constructor( @InjectModel(Sport.name) private SportModel: Model<Sport>){}

    /**
     * Service used to get a specific sport
     * @param {string} id
     * @return {Model<Sport>}
     */
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

    /**
     * Service used to get all sports available in the database
     * @return {Model<Sport>[]}
     */
    async getSports(){
            const sport = await this.SportModel.find({});
            return sport;

    }

    /**
     * Service used to add a sport
     * @param {string} name
     * @return {Model<Sport>}
     */
    async addSport(name){
        const newSport = await this.SportModel.create({name: name});
        newSport.save()
        return newSport
    }

    /**
     * Service used to delete a specific sport
     * @param {string} id
     * @return {}
     */
    async delSport(sportId){
        await this.SportModel.findByIdAndDelete(sportId);
        return {
            message: "Deleted ok"
        };
    }
}
