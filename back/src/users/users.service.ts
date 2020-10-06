import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { MySport } from '../schemas/mySport.schema';
import { MyFavorite } from '../schemas/myFavorite.schema';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { isNull, isError } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
  @InjectModel(MySport.name) private mySportModel: Model<MySport>,
  @InjectModel(MyFavorite.name) private myFavoriteModel: Model<MyFavorite>,
  ) {
  }

  async userExists(createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });
    if(isNull(user)){
      return false;
    }
    return true;
  }


 

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;
    const firstName = createUserDto.firstName;
    const lastName = createUserDto.lastName;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await new this.userModel({ firstName: firstName, lastName: lastName,email: email, password: hashedPassword ,isAdmin: false });
    return createdUser.save();
  }

  async findAll(): Promise<User[]>  {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<any> {
   const user = await this.userModel.find({'email':email}).exec();
   return user;
  }

  async deleteUser(id) : Promise<void>{
    this.userModel.deleteOne({'_id':id}).exec();
  }

 
  async update(id, body): Promise<any>{
    const user = await this.userModel.findById(id);
    let userUpdated = user;
    let updated = "nothing updated";
    
    if (body.hasOwnProperty("firstName")){
      userUpdated = await this.userModel.findByIdAndUpdate( id,{"firstName": body.firstName},{new:true,useFindAndModify:false}) 
      updated = "user updated"
    }
    if (body.hasOwnProperty("lastName")){
      userUpdated = await this.userModel.findByIdAndUpdate( id,{"lastName": body.lastName},{new:true,useFindAndModify:false}) 
      updated = "user updated"
    }
    if (body.hasOwnProperty("email")){
      userUpdated = await this.userModel.findByIdAndUpdate( id,{"email": body.email},{new:true,useFindAndModify:false}) 
      updated = "user updated"
    } 
    if (body.hasOwnProperty("password")){
      const hashedPassword = await bcrypt.hash(body.password, 10);
      userUpdated = await this.userModel.findByIdAndUpdate( id,{"password": hashedPassword},{new:true,useFindAndModify:false}) 
      updated = "user updated"
    } 
  
   
    return [userUpdated, updated]
  }


}