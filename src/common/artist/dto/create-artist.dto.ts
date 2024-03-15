import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;

  id: string;

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
    this.id = uuidv4(); // Generate UUID for id
  }
}
