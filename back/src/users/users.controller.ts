import { Body, Controller, Get, Put, Post, Param, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../schemas/user.schema';
import { HttpException, HttpStatus , HttpCode} from '@nestjs/common'

@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if(await this.usersService.userExists(createUserDto)){
      throw new HttpException({
        message: 'User already Exist',
      }, HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    if(false){
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else{
      return this.usersService.findAll();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(id);
  }


}