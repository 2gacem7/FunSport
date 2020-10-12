import { Body, Controller, Get, Post, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PronosticsService } from './pronostics.service';
import { CreatePronosticDto } from '../dto/create-pronostic.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pronostic } from '../schemas/pronostic.schema';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common'


@Controller('pronostics')
export class PronosticsController {
  /**
   * Constructor for Pronostics controller
   * @param pronosticsService
   * @param {Model<Pronostic>} pronosticModel
   */
  constructor(private readonly pronosticsService: PronosticsService,
    @InjectModel(Pronostic.name) private pronosticModel: Model<Pronostic>) { }


  @UseGuards(JwtAuthGuard)
  @Post()
   /**
  * Controller check if the matchId userId doesn't matchs in the pronostics:
  * - if match : update the matchId userId
  * - if not : create a new pronostic
  * You need to be connected to access to this route
  * @param {Request}
  * @param {Body} createPronosticDto
  * @return {Pronostic}
  */
  async create(@Request() req, @Body() createPronosticDto: CreatePronosticDto) {
    const user = req.user.id
    if (createPronosticDto.matchId && createPronosticDto.winnerId && createPronosticDto.type) {
      const matchesUserIdMatchId = await this.pronosticModel.find({ userId: user, matchId: createPronosticDto.matchId });
      if (matchesUserIdMatchId.length != 0) {
        return await this.pronosticsService.updateOne(user, createPronosticDto);
      } else {
        return await this.pronosticsService.create(user, createPronosticDto);
      }
    } else {
      throw new HttpException({
        error: 404,
        message: "userId, matchId, winnerId and type are mandatory. Only commentary is optional"
      }, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * Controller give all pronostics in the database
   * You need to be connected to access to this route
   * @return {Pronotic[]}
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Pronostic[]> {
    return this.pronosticsService.findAll();
  }

  /**
  * Controller give all pronostics for one match id
  * You need to be connected to access to this route
  * @param {string} matchId
  * @return {Pronostic[]}
  */
  @UseGuards(JwtAuthGuard)
  @Get(':matchId')
  async findOne(@Param('matchId') matchId: string): Promise<any> {
    return this.pronosticsService.findPronosticForOneMatchId(matchId);
  }

  /**
   * Controller delete a specific pronostic
   * You need to be connected to access to this route
   * @param {string} pronostic id
   * @return  {}
  */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    if (id) {
      return this.pronosticsService.deleteOne(id);

    }
    throw new HttpException({
      error: 404,
      message: "id is mandatory"
    }, HttpStatus.BAD_REQUEST)
  }
}
