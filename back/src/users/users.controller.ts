import { Body, Controller, Get, Put, Post, Param, Delete, Patch, UseGuards, Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if(!isAdmin){
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else{
      return this.usersService.findAll();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string): Promise<any> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if(!isAdmin){
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else{
      return this.usersService.findUserById(id);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string): Promise<any> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if(!isAdmin){
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else{
      return this.usersService.deleteUser(id);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Request() req, @Body() body) {
    const id = req.user.id
    return this.usersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/createUser')
  async adminCreate(@Request() req,@Body() createUserDto: CreateUserDto) {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if(!isAdmin){
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else{
      if(await this.usersService.userExists(createUserDto)){
        throw new HttpException({
          message: 'User already Exist',
        }, HttpStatus.BAD_REQUEST);
      }
      return await this.usersService.adminCreate(createUserDto);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/updateUser')
  async adminUpdate(@Request() req, @Body() body) {
    const id = req.user.id
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if(!isAdmin){
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else{
      return this.usersService.adminUpdate(body.id, body);
    }
  }


}