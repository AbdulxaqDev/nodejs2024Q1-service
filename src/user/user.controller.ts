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
  Res,
} from '@nestjs/common';
import { validate } from 'uuid';

import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { isValidId } from 'src/utils/id-validator.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.userService.create(createUserDto);
    return {
      statusCode: 201,
      message: [createdUser],
      error: null,
    };
  }

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidId = validate(id);
    const user = this.userService.findOne(id);

    if (isValidId && user) {
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: [this.userService.findOne(id)],
        error: null,
      });
    } else if (isValidId) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['User Not Found'],
        error: 'Not Found',
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: ['Invalid User ID'],
      error: 'Back Request',
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, UpdatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
