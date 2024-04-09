import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(process.env.CRYPT_SALT);
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken(userId: string, login: string) {
    return jwt.sign({ userId, login }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET_REFRESH_KEY, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return decoded;
    } catch (error) {
      return false;
    }
  }
}
