import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Widget } from '../schemas/widget.schema';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { isNull, isError } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
  @InjectModel(Widget.name) private widgetModel: Model<Widget>) {
  }

  async userExists(createUserDTO: CreateUserDto): Promise<any> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });
    if(isNull(user)){
      return false;
    }
    return true;
  }


  async update(id, updateUserDto: UpdateUserDto): Promise<User>{
    const userToUpdate = await this.userModel.findById(id);
     if (updateUserDto['password'] == ""){
      updateUserDto['password'] = userToUpdate.password;
    } else if (!await bcrypt.compare( updateUserDto['password'], userToUpdate.password)){
      const hashedPassword = await bcrypt.hash(updateUserDto['password'], 10);
      updateUserDto['password'] = hashedPassword;
    } else {
      updateUserDto['password'] = userToUpdate.password;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true,useFindAndModify:false})
    return updatedUser;

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


}