import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { UsersDB } from 'src/db/db';
import { User } from './entities/user.entity';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const { password: uPassword, ...userWithoutPassword } = new CreateUserDto(
      login,
      password,
    );
    DBs[Endpoints.USER].push({ password: uPassword, ...userWithoutPassword });
    return { ...userWithoutPassword };
  }

  findAll() {
    const users = UsersDB.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return { ...userWithoutPassword };
    });
    return JSON.stringify(users);
  }

  findOne(id: string) {
    const { password, ...userWithoutPassword } = UsersDB.find(
      (user) => user.id === id,
    );
    return { ...userWithoutPassword };
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { password, ...userWithoutPassword } = UsersDB.find((user) => {
      if (user.id === id) {
        user.password = updatePasswordDto.newPassword;
        user.updatedAt = Date.now();
        user.version++;
        return user;
      }
    });
    return userWithoutPassword;
  }

  remove(user: User) {
    UsersDB.splice(UsersDB.indexOf(user), 1);
  }
}
