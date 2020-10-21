import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { MySport } from '../schemas/mySport.schema';
import { MyFavorite } from '../schemas/myFavorite.schema';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common'

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import * as bcrypt from 'bcrypt';

/**
 * Service used for managing the actions available in Model<User>
 */
@Injectable()
export class UsersService {
  /**
     * Constructor of UsersService
     * @param {Model<Sport>} mySportModel
     * @param {Model<MyFavorite>} myFavoriteModel
     * @param {Model<User>} userModel
     */
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(MySport.name) private mySportModel: Model<MySport>,
    @InjectModel(MyFavorite.name) private myFavoriteModel: Model<MyFavorite>,
  ) {
  }

  /**
     * Service used to check if a user is admin or not
     * @param {string} id id of the user to check
     * @return  {boolean}
     */
  async isAdmin(id): Promise<boolean> {
    const user = await this.userModel.findById(id);
    if (user !== null) {
      return user.isAdmin
    }
    return false;
  }

  /**
       * Service used to check if a user exists or not
       * @param {CreateUserDto} createUserDto object of the user
       * @return  {boolean}
       */
  async userExists(createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });
    if (user === null) {
      return false;
    }
    return true;
  }

  /**
     * Service used to create un new user regsiter
     * @param {CreateUserDto} createUserDto object of the user
     * @return  {Promise<User>}
     */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const firstName = createUserDto.firstName;
    const lastName = createUserDto.lastName;
    const phone = createUserDto.phone;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await new this.userModel({ firstName: firstName, lastName: lastName, phone: phone, email: email, password: hashedPassword, isAdmin: false });
    return createdUser.save();
  }


  /**
    * Service used to get all users
    * @return  {Promise<User[]>}
    */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
     * Service used to get a specific user from email
     * @param {string} email Email of the user to find
     * @return  {Promise<any>}
     */
  async findOne(email: string): Promise<any> {
    const user = await this.userModel.find({ 'email': email }).exec();
    return user;
  }

  /**
     * Service used to get a specific user from id
     * @param {string} id id of the user to find
     * @return  {Promise<any>}
     */
  async findUserById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  /**
     * Service used to delete a specific user
     * @param {string} id id of the user to delete
     * @return  {Promise<any>}
     */
  async deleteUser(id): Promise<any> {
    const result = await this.userModel.deleteOne({ '_id': id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException({
        message: 'No user deleted',
      }, HttpStatus.BAD_REQUEST);
    }
    else return {
      message: "User Deleted !",
    }
  }

  /**
       * Service used to update a specific user
       * @param {string} id id of the user to update
       * @param {string} body body used to update the user
       * @return  {Promise<any>}
       */
  async update(id, body): Promise<any> {
    const user = await this.userModel.findById(id);
    let userUpdated = user;
    let updated = true;

    if (body.hasOwnProperty("firstName")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "firstName": body.firstName }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("lastName")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "lastName": body.lastName }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("email")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "email": body.email }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("password")) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "password": hashedPassword }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("phone")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "phone": body.phone }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (updated) {
      return userUpdated;
    }
    else {
      throw new HttpException({
        message: 'Nothing Updated',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  /**
    * Service used to create un new user  from manageUser
    * @param {CreateUserDto} createUserDto object of the user
    * @return  {Promise<User>}
    */
  async adminCreate(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const firstName = createUserDto.firstName;
    const lastName = createUserDto.lastName;
    const phone = createUserDto.phone;
    const isAdmin = createUserDto.isAdmin;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await new this.userModel({ firstName: firstName, lastName: lastName, phone: phone, email: email, password: hashedPassword, isAdmin: isAdmin });
    return createdUser.save();
  }

  /**
     * Service used to update a specific user from manageUser
     * @param {string} id id of the user to update
     * @param {string} body body used to update the user
     * @return  {Promise<any>}
     */
  async adminUpdate(id, body): Promise<any> {
    const user = await this.userModel.findById(id);
    let userUpdated = user;
    let updated = false;
    if (body.hasOwnProperty("firstName")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "firstName": body.firstName }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("lastName")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "lastName": body.lastName }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("email")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "email": body.email }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("password")) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "password": hashedPassword }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("phone")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "phone": body.phone }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (body.hasOwnProperty("isAdmin")) {
      userUpdated = await this.userModel.findByIdAndUpdate(id, { "isAdmin": body.isAdmin }, { new: true, useFindAndModify: false });
      updated = true;
    }
    if (updated) {
      return userUpdated;
    }
    else {
      throw new HttpException({
        message: 'Nothing Updated',
      }, HttpStatus.BAD_REQUEST);
    }
  }


}