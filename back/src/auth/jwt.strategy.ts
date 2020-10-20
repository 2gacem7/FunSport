import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

/**
 *Strategy used to define the JWT strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
 * Constructor for the JWTStrategy
 */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

    /**
 * Method used to validate the payload of the JWT
 * @param {} payload
 * @return {}
 */
  async validate(payload: any) {
    return { id: payload.id, email: payload.email, firstName: payload.firstName, lastName: payload.lastName, phone: payload.phone , isAdmin: payload.isAdmin};
  }

}