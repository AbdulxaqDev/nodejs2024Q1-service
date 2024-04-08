import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserLoginDto, CreateUserSignupDto } from './dto/create-auth.dto';
import { RefreshAuthDto } from './dto/update-auth.dto';
import { response } from 'src/utils/response.util';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserSignupDto: CreateUserSignupDto) {
    return await this.authService.signup(createUserSignupDto);
  }

  @Post('login')
  async login(
    @Body() createUserLoginDto: CreateUserLoginDto,
    @Res() res: Response,
  ) {
    const { status, message } = await this.authService.login(
      createUserLoginDto,
    );
    return response(status, message, res);
  }

  @Post('refresh')
  async refresh(@Body() refreshAuthDto: RefreshAuthDto, @Res() res: Response) {
    const { status, message } = await this.authService.refresh(refreshAuthDto);
    return response(status, message, res);
  }
}
