import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

/**
 * Controller used for the route 'auth'
 */
@Controller('auth')
export class AuthController {
  /**
    * Constructor for AuthController
    */
  constructor(private authService: AuthService) { }


  /**
       * Controller when a user wants to login
       * @param {} req
       * @return {}
       */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}