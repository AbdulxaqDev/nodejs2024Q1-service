import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Header,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';

import { validate } from 'uuid';
import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { response } from 'src/utils/response.util';
import { UsersDB } from 'src/db/db';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.userService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: [createdUser],
      error: null,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidId = validate(id);
    if (isValidId) {
      const user = this.userService.findOne(id);
      if (isValidId && user) {
        return response(HttpStatus.OK, user, null, res);
      } else if (isValidId) {
        return response(
          HttpStatus.NOT_FOUND,
          'User Not Found',
          'Not Found',
          res,
        );
      }
    }

    // if (isValidId && this.userService.findOne(id)) {
    //   return response(HttpStatus.OK, user, null, res);
    // } else if (isValidId) {
    //   return response(HttpStatus.NOT_FOUND, 'User Not Found', 'Not Found', res);
    // }

    return response(
      HttpStatus.BAD_REQUEST,
      'Invalid User ID',
      'Back Request',
      res,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const isValidId = validate(id);
    const user = UsersDB.find((user) => user.id === id);

    if (isValidId && user.password === updatePasswordDto.oldPassword) {
      const updatedUser = this.userService.update(id, updatePasswordDto);

      return response(HttpStatus.OK, updatedUser, null, res);
    } else if (isValidId && user.password !== updatePasswordDto.oldPassword) {
      return response(HttpStatus.FORBIDDEN, 'Wrong Password', 'Forbidden', res);
    }

    return response(
      HttpStatus.BAD_REQUEST,
      'Invalid User ID',
      'Bad Request',
      res,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
