import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 *Strategy used to define the passport Strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
 * Constructor for the localStrategy
 * @param {AuthService} authService
 */
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
 * Method used to check if a user is validated to access to other elements
 * @param {string} email
 * @param {string} password
 * @return {}
 */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}