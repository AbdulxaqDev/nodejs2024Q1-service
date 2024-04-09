import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  BcryptService,
  AuthService as JWTAuthService,
} from 'src/services/authorization.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JWTAuthService, JwtService],
})
export class AuthModule {}
