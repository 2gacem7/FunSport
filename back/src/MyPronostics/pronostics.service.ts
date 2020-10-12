import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pronostic } from '../schemas/pronostic.schema';
import { HttpException, HttpStatus } from '@nestjs/common'

import { CreatePronosticDto } from '../dto/create-pronostic.dto';

@Injectable()
export class PronosticsService {
  constructor(@InjectModel(Pronostic.name) private pronosticModel: Model<Pronostic>
  ) {
  }
  async create(userId:Number, createPronosticDto: CreatePronosticDto): Promise<Pronostic> {
    const createdPronostic = await new this.pronosticModel({
      userId: userId,
      matchId: createPronosticDto.matchId,
      winnerId: createPronosticDto.winnerId,
      commentary: (createPronosticDto.commentary ? createPronosticDto.commentary : "")
    })
    return createdPronostic.save();
  }

  async findAll(): Promise<any> {
    return this.pronosticModel.find({});
  }

  async findPronosticForOneMatchId(matchId: string): Promise<any> {
    const pronostic = await this.pronosticModel.find({ 'matchId': matchId }).exec();
    return pronostic;
  }

  async deleteOne(id): Promise<any> {
    const result = await this.pronosticModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpException({
        message: 'No pronostic deleted',
      }, HttpStatus.BAD_REQUEST);
    }
    else return {
      message: "Pronostic Deleted !",
    }
  }

  async updateOne(userId, createPronosticDto): Promise<any> {
    const newPronostic = await this.pronosticModel.findOne({ userId: userId, matchId: createPronosticDto.matchId });
    newPronostic.winnerId = createPronosticDto.winnerId
    newPronostic.commentary = (createPronosticDto.commentary ? createPronosticDto.commentary : "")
    return newPronostic.save();
  }
}
