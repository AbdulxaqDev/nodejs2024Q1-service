import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { validateId } from 'src/utils/id-validator.util';
import { Response } from 'express';
import { Endpoints } from 'src/entities/common.entity';
import { response } from 'src/utils/response.util';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  createTrack(
    @Param('id') id: string,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    const isValidIdAndTrack = validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      this.favsService.createTrack(id);
      return response(HttpStatus.CREATED, isValidIdAndTrack, res);
    }
  }

  @Post('artist/:id')
  createArtist(
    @Param('id') id: string,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    const isValidIdAndArtist = validateId(id, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      this.favsService.createArtist(id);
      return response(HttpStatus.CREATED, isValidIdAndArtist, res);
    }
  }

  @Post('album/:id')
  createAlbum(
    @Param('id') id: string,
    @Res() res: Response,
  ): Response<any, Record<string, any>> {
    const isValidIdAndAlbum = validateId(id, Endpoints.ALBUM, res);

    if (isValidIdAndAlbum) {
      this.favsService.createAlbum(id);
      return response(HttpStatus.CREATED, isValidIdAndAlbum, res);
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    return response(HttpStatus.OK, this.favsService.findAll(), res);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
  //   return this.favsService.update(+id, updateFavDto);
  // }

  @Delete(':id')
  removeTrack(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      this.favsService.removeTrack(id);
      return response(HttpStatus.NO_CONTENT, 'Deleted', res);
    }
  }

  @Delete(':id')
  removeArtist(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = validateId(id, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      this.favsService.removeArtist(id);
      return response(HttpStatus.NO_CONTENT, 'Deleted', res);
    }
  }

  @Delete(':id')
  removeAlbum(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = validateId(id, Endpoints.ALBUM, res);

    if (isValidIdAndAlbum) {
      this.favsService.removeAlbum(id);
      return response(HttpStatus.NO_CONTENT, 'Deleted', res);
    }
  }
}
