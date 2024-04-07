import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Header,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';

import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { response } from 'src/utils/response.util';
import { validateId } from 'src/utils/id-validator.util';
import { Endpoints } from 'src/entities/common.entity';

@Controller(Endpoints.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    if (user.error) {
      return response(user.status, user.error, res);
    }
    return response(user.status, user.newUser, res);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return response(HttpStatus.OK, users, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndUser = await validateId(id, Endpoints.USER, res);

    if (isValidIdAndUser) {
      return response(HttpStatus.OK, isValidIdAndUser, res);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const isValidIdAndUser = await validateId(id, Endpoints.USER, res);

    if (isValidIdAndUser) {
      if (isValidIdAndUser.password === updatePasswordDto.oldPassword) {
        const updatedUser = await this.userService.update(id, updatePasswordDto, isValidIdAndUser.version + 1);
        return response(HttpStatus.OK, updatedUser, res);
      } else if (isValidIdAndUser.password !== updatePasswordDto.oldPassword) {
        return response(HttpStatus.FORBIDDEN, 'Wrong Password', res);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndUser = await validateId(id, Endpoints.USER, res);

    if (isValidIdAndUser) {
      await this.userService.remove(id);
      return response(HttpStatus.NO_CONTENT, 'User deleted', res);
    }
  }
}
