import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  id: string;
  createdAt: number;
  updatedAt: number;
  version: number;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = uuidv4(); // Generate UUID for id
    const now = Date.now();
    this.createdAt = now; // Set creation time
    this.updatedAt = now; // Set updated time
    this.version = 1; // Set initial version
  }
}
