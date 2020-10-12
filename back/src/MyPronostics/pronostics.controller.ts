import { Body, Controller, Get, Post, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { PronosticsService } from './pronostics.service';
import { CreatePronosticDto } from '../dto/create-pronostic.dto';
// import { UpdatePronosticDto } from '../dto/update-pronostic.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pronostic } from '../schemas/pronostic.schema';
import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'


@Controller('pronostics')
export class PronosticsController {
  constructor(private readonly pronosticsService: PronosticsService,
    @InjectModel(Pronostic.name) private pronosticModel: Model<Pronostic>) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  // Create a pronostic if the matchId userId doesn't exists in the pronostic
  // or Update the matchId userId if the association exists
  // return : Pronostic
  async create(@Body() createPronosticDto: CreatePronosticDto) {
    if (createPronosticDto.userId && createPronosticDto.matchId && createPronosticDto.winnerId && createPronosticDto.type){
      const matchesUserIdMatchId = await this.pronosticModel.find({userId:createPronosticDto.userId, matchId:createPronosticDto.matchId});
      if (matchesUserIdMatchId.length!=0){
        return await this.pronosticsService.updateOne(createPronosticDto);
      } else {
        return await this.pronosticsService.create(createPronosticDto);
      }
    } else {
      throw new HttpException({
        error:404,
        message:"userId, matchId, winnerId and type are mandatory"
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  // Give all pronostics in the database
  // return: Pronotic array
  async findAll(): Promise<Pronostic[]> {
    return this.pronosticsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':matchId')
  //*
  // Give all pronostics for one match id
  // :matchid: Number
  // return : Pronostic Array
  //
  async findOne(@Param('matchId') matchId: string): Promise<any> {
    return this.pronosticsService.findPronosticForOneMatchId(matchId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  // Delete one pronostic
  // :id Number
  // return : {} Pronostic
  async delete(@Param('id') id: string): Promise<any> {
    return this.pronosticsService.deleteOne(id);
  }
}
