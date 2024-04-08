import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserSignupDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = uuidv4(); // Generate UUID for id
    const now = new Date();
    this.createdAt = now.toString(); // Set creation time
    this.updatedAt = now.toString(); // Set updated time
    this.version = 1; // Set initial version
  }
}

export class CreateUserLoginDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
