/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', // protect this, move to env vars,
    });
  }

  async validate(payload: any) {
    // const user = await this.usersService.getById(payload.id)
    return {
      id: payload.id,
      name: payload.name,
      // ...user
    };
  }
}
