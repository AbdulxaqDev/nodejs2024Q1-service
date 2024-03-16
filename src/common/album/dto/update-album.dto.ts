import { IsNotEmpty, IsString, IsNumber, Validate } from 'class-validator';
import { IdValidator } from '../validators/artist-id.validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IdValidator)
  artistId: string;
}
