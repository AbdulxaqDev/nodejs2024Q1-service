import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    try {
      const { password: uPassword, ...newUser } = await DBs[
        Endpoints.USER
      ].create({ data: new CreateUserDto(login, password) });

      return { status: HttpStatus.CREATED, newUser };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: `The ${error.meta.modelName} already exist with given ${error.meta.target}`,
        };
      } else {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error occured while creating new ${error.meta.modelName}`,
        };
      }
    }
  }

  async findAll() {
    const users = await DBs[Endpoints.USER].findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  findOne(id: string) {
    const user = DBs[Endpoints.USER].findOne({
      where: {
        id,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
    version: number,
  ) {
    const updatedUser = await DBs[Endpoints.USER].update({
      data: {
        password: updatePasswordDto.newPassword,
        updatedAt: new Date().toString(),
        version,
      },
      where: {
        id,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await DBs[Endpoints.USER].delete({
      where: { id },
    });
  }
}
