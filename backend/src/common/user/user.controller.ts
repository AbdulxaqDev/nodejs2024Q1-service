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
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createdUser = this.userService.create(createUserDto);
    return response(HttpStatus.CREATED, createdUser, res);
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
    const isValidIdAndUser = validateId(id, Endpoints.USER, res);

    if (isValidIdAndUser) {
      const { password, ...userWithoutPassword } = isValidIdAndUser;
      password;
      return response(HttpStatus.OK, userWithoutPassword, res);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const isValidIdAndUser = validateId(id, Endpoints.USER, res);

    if (isValidIdAndUser) {
      if (isValidIdAndUser.password === updatePasswordDto.oldPassword) {
        const updatedUser = this.userService.update(id, updatePasswordDto);
        return response(HttpStatus.OK, updatedUser, res);
      } else if (isValidIdAndUser.password !== updatePasswordDto.oldPassword) {
        return response(HttpStatus.FORBIDDEN, 'Wrong Password', res);
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndUser = validateId(id, Endpoints.USER, res);

    if (isValidIdAndUser) {
      this.userService.remove(isValidIdAndUser);
      return response(HttpStatus.NO_CONTENT, 'User deleted', res);
    }
  }
}
