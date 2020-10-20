import { Body, Controller, Get, Put, Post, Param, Delete, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { User } from '../schemas/user.schema';
import { HttpException, HttpStatus, HttpCode } from '@nestjs/common'


/**
 * Controller used for the route 'users'
 * This routes are manage the users
 */
@Controller('users')
export class UsersController {
  /**
     * Constructor for UsersController
     */
  constructor(private readonly usersService: UsersService) { }

  /**
      * Controller used to add a user in the database
      * @param {CreateUserDto} createUserDto
      * @return {Model<User>}
      */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.usersService.userExists(createUserDto)) {
      throw new HttpException({
        message: 'User already Exist',
      }, HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.create(createUserDto);
  }

  /**
     * Controller used to have all users in the database
     * @return {Model<User[]>}
     */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
      return this.usersService.findAll();
    }
  }

  /**
     * Controller used to have all details for a specific user
     * @param {string} id The id given in the database
     * @return {Model<User>}
     */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string): Promise<any> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
      return this.usersService.findUserById(id);
    }
  }

  /**
     * Controller used to delete a specific user in the Model<User>
     * @param {Request} req
     * @return {}
     */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string): Promise<any> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
      return this.usersService.deleteUser(id);
    }
  }

  /**
     * Controller used to patch a specific user in the Model<User>
     * @param {Request} req
     * @param {} body
     * @return {Model<User>}
     */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Request() req, @Body() body) {
    const id = req.user.id
    return this.usersService.update(id, body);
  }

  /**
     * Controller used to add a user in the database from admin user
     * @param {CreateUserDto} createUserDto
     * @param {Request} req
     * @return {Model<User>}
     */
  @UseGuards(JwtAuthGuard)
  @Post('admin/createUser')
  async adminCreate(@Request() req, @Body() createUserDto: CreateUserDto) {
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
      if (await this.usersService.userExists(createUserDto)) {
        throw new HttpException({
          message: 'User already Exist',
        }, HttpStatus.BAD_REQUEST);
      }
      return await this.usersService.adminCreate(createUserDto);
    }
  }

  /**
    * Controller used to update a specific user in the Model<User> from admin user
    * @param {Request} req
    * @param {} body
    * @return {Model<User>}
    */
  @UseGuards(JwtAuthGuard)
  @Patch('admin/updateUser')
  async adminUpdate(@Request() req, @Body() body) {
    const id = req.user.id
    const isAdmin = await this.usersService.isAdmin(req.user.id);
    if (!isAdmin) {
      throw new HttpException({
        message: 'Unauthorized Access',
      }, HttpStatus.UNAUTHORIZED);
    }
    else {
      return this.usersService.adminUpdate(body.id, body);
    }
  }


}