import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string; // new name

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean; // new grammy
}
