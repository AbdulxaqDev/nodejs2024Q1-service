import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { UsersDB } from 'src/db/db';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const newUser = new CreateUserDto(login, password);
    UsersDB.push(newUser);
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return JSON.stringify(UsersDB);
  }

  findOne(id: string) {
    return UsersDB.find((user) => user.id === id);
  }

  update(id: string, UpdatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
