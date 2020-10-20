import { Controller, Get, Request, Post, UseGuards,Put } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';

/**
 * General controller for the application
 */
@Controller()
export class AppController {
   /**
     * Constructor for UsersController
     * @param {AppService} appService
     */
  constructor(private readonly appService: AppService) {}

  /**
     * Controller used to get all data for the user given a JWT
     * @param {} req
     * @return {string}
     */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}