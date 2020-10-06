import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passVerify = await bcrypt.compare(pass, user[0].password);
    if (user.length > 0 && passVerify) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user[0].email, id: user[0]._id };
    const access_token = this.jwtService.sign(payload)
    await this.usersService.updateToken( user[0]._id, access_token);
    return {
      access_token: access_token,
    };
    }

    googleLogin(req) {
      if (!req.user) {
        return 'No user from google'
      }
  
      return {
        message: 'User information from google',
        user: req.user
      }
    }
}