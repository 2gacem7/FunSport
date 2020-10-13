import { Controller, Get, Delete,Post,Request, UseGuards,Put, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SportsService } from './sports.service';

import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'

/**
 * Controller used for the route 'sports'
 * This routes are used to add or delete a sport to display
 */
@Controller('sports')
export class SportsController {
    /**
     * Constructor for SportsController
     */
    constructor(private readonly SportsService: SportsService) {}

    /**
     * Controller used to have all details for a specific sport
     * @param {string} id The id given in the database
     * @return {Model<Sport>}
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getSport(@Param('id') id: string) {
        const sport = await this.SportsService.getSport(id)
        return sport;
    }

    /**
     * Controller used to have all sports in the database
     * @return {Model<Sport>[]}
     */
    @Get()
    async getSports() {
        const sports = await this.SportsService.getSports()
        return sports;
    }

    /**
     * Controller used to add a sport in the database
     * @param {Request} req
     * @return {Model<Sport>}
     */
    @UseGuards(JwtAuthGuard)
    @Post()
    async addSport(@Request() req) {
        let list
        if (req.body.name){
            list = await this.SportsService.addSport(req.body.name)
        }
        else {
            throw new HttpException({
                message: 'Name is Mandatory',
            }, HttpStatus.BAD_REQUEST);
        }
        return list;
    }

    /**
     * Controller used to delete a specific sport in the Model<Sport>
     * @param {Request} req
     * @return {}
     */
    @UseGuards(JwtAuthGuard)
    @Delete()
    async delSport(@Request() req) {
        if (req.body.id){
            return await this.SportsService.delSport(req.body.id)
        } else {
            throw new HttpException({
                message: 'Id is Mandatory',
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
