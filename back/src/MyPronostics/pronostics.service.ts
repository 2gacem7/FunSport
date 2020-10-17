import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pronostic } from '../schemas/pronostic.schema';
import { HttpException, HttpStatus } from '@nestjs/common'

import { CreatePronosticDto } from '../dto/create-pronostic.dto';

/**
 * Service used to manage all action available in PronosticsService
 */
@Injectable()
export class PronosticsService {
  /**
   * Constructor for PronosticsService
   */
  constructor(@InjectModel(Pronostic.name) private pronosticModel: Model<Pronostic>
  ) {
  }

  /**
   * Service used to create a pronostic
   * You need to be connected to access to this route
   * @param {string} userId
   * @param {CreatePronosticDto} createPronosticDto
   * @return {Pronostic}
   */
  async create(userId: string, createPronosticDto: CreatePronosticDto): Promise<Pronostic> {
    const createdPronostic = await new this.pronosticModel({
      userId: userId,
      matchId: createPronosticDto.matchId,
      type: createPronosticDto.type,
      winnerId: createPronosticDto.winnerId,
      commentary: (createPronosticDto.commentary ? createPronosticDto.commentary : ""),
      isReported: false,
      authorName: createPronosticDto.authorName,
      createdAt:createPronosticDto.createdAt
    })
    return createdPronostic.save();
  }

  /**
   * Service used to give all pronostics in the database
   * You need to be connected to access to this route
   * @return {Pronotic[]}
   */
  async findAll(): Promise<any> {
    return this.pronosticModel.find({isReported:true});
  }

  /**
   * Service used to give all pronostics for a specific match
   * You need to be connected to access to this route
   * @param {string} matchId
   * @returns {Pronostic[]}
   */
  async findPronosticForOneMatchId(matchId: string): Promise<any> {
    const pronostic = await this.pronosticModel.find({ 'matchId': matchId});
    return pronostic;
  }

  /**
   * Service used to delete a specific pronostic
   * You need to be connected to access to this route
   * @param {string} id pronostic id
   * @returns  {JSON}
   */
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

  /**
   * Service used to update a specific pronostic
   * You need to be connected to access to this route
   * @param {String} userId id of the user
   * @return  {Pronostic}
   */
  async updateOne(userId, createPronosticDto): Promise<any> {
    const newPronostic = await this.pronosticModel.findOne({ userId: userId, matchId: createPronosticDto.matchId, type: createPronosticDto.type });
    newPronostic.winnerId = createPronosticDto.winnerId
    newPronostic.commentary = (createPronosticDto.commentary ? createPronosticDto.commentary : "")
    newPronostic.isReported = false
    return newPronostic.save();
  }

  /**
  * Service used to reset the field commentary for a specific pronostic
  * You need to be connected to access to this route and to be isAdmin
  * @param {String} pronosticId id of the pronostic
  * @return  {Pronostic}
  */
  async resetCommentary(pronosticId) {
    const newPronostic = await this.pronosticModel.findById(pronosticId);
    newPronostic.commentary = ""
    newPronostic.isReported = false
    return newPronostic.save();

  }


  /**
  * Service used to validate a commentary
  * You need to be connected to access to this route and to be isAdmin
  * @param {String} pronosticId id of the pronostic
  * @return  {Pronostic}
  */
  async validateCommentary(pronosticId) {
    const newPronostic = await this.pronosticModel.findById(pronosticId);
    newPronostic.isReported = false
    return newPronostic.save();

  }


  /**
  * Service used to report a commentary
  * You need to be connected to access to this route and to be isAdmin
  * @param {String} pronosticId id of the pronostic
  * @return  {Pronostic}
  */
  async reportCommentary(pronosticId) {
    const newPronostic = await this.pronosticModel.findById(pronosticId);
    newPronostic.isReported = true
    return newPronostic.save();

  }
}
