import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**
 * Service used for managing the actions available for Auth controller
 */
@Injectable()
export class AuthService {
  /**
     * Constructor of SportsService
     * @param {UsersService} usersService
     * @param {JwtService} jwtService
     */
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

    /**
     * Service used to validate the credentials
     * @param {string} email email of the user
     * @param {string} pass password of the user
     * @return {}
     */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passVerify = await bcrypt.compare(pass, user[0].password);
    if (user.length > 0 && passVerify) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

   /**
     * Service used to return the access_token
     * @param {} user user object
     * @return {}
     */
  async login(user: any) {
    const payload = {
                      email: user[0].email,
                      id: user[0]._id ,
                      firstName: user[0].firstName,
                      lastName: user[0].lastName ,
                      isAdmin: user[0].isAdmin,
                      phone: user[0].phone,
                    };
    const access_token = this.jwtService.sign(payload)
    return {
      access_token: access_token,
    };
    }

}