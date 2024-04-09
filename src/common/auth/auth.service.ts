import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserSignupDto, CreateUserLoginDto } from './dto/create-auth.dto';
import { RefreshAuthDto } from './dto/update-auth.dto';
import {
  BcryptService,
  AuthService as JWTAuthService,
} from 'src/services/authorization.service';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class AuthService {
  constructor(
    private bcryptService: BcryptService,
    private jwtAuthService: JWTAuthService,
  ) {}

  async signup(createUserSignupDto: CreateUserSignupDto) {
    const { login, password } = createUserSignupDto;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    const newUser = new CreateUserSignupDto(login, hashedPassword);

    return await DBs[Endpoints.USER].create({
      data: newUser,
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
  }

  async login(createUserLoginDto: CreateUserLoginDto) {
    const { login, password } = createUserLoginDto;
    const user = await DBs[Endpoints.USER].findUnique({
      where: { login },
    });

    if (user) {
      const isCorrectPassword = this.bcryptService.comparePasswords(
        password,
        user.password,
      );
      if (isCorrectPassword) {
        return {
          status: HttpStatus.OK,
          message: {
            accessToken: this.jwtAuthService.generateAccessToken(
              user.id,
              login,
            ),
            refreshToken: this.jwtAuthService.generateRefreshToken(user.id),
          },
        };
      }
    } else {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Login or Password is incorrect!',
      };
    }
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    const { refreshToken } = refreshAuthDto;
    const isValid = await this.jwtAuthService.verifyRefreshToken(refreshToken);

    if (isValid) {
      const { userId } = isValid;
      const { id, login } = await DBs[Endpoints.USER].findUnique({
        where: {
          id: userId,
        },
      });
      return {
        status: HttpStatus.OK,
        message: {
          accessToken: this.jwtAuthService.generateAccessToken(id, login),
          refreshToken: this.jwtAuthService.generateRefreshToken(userId),
        },
      };
    } else {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'Refresh token is expired, relogin please!',
      };
    }
  }
}
