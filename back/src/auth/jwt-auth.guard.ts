import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard used to protect the JWT
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}