import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null;

  id: string;

  constructor(name: string, year: number, artistId: string) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
    this.id = uuidv4(); // Generate UUID for id
  }
}
