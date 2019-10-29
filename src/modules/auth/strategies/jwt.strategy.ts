import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../base/config/config.service';
import { UsersService } from '../../users/users.service';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_KEY'),
    });
  }

  validate({ username, id }: JwtDto) {
    return this.userService.findOne({where: {username, id}});
  }
}
