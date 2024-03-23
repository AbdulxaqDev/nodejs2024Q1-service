import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number

  id: string; // uuid v4

  constructor(
    name: string,
    artistId: string,
    albumId: string,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
    this.id = uuidv4();
  }
}
