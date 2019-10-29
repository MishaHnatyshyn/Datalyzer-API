import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
import { BcryptService } from '../../base/bcrypt.service';
import { ConfigModule } from '../../base/config/config.module';

dotenv.config({ path: `${__dirname}/../../../.env` });
const { JWT_KEY } = process.env;

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, BcryptService],
})
export class AuthModule {}
