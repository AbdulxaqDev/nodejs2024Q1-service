import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { validateId } from 'src/utils/id-validator.util';
import { Response } from 'express';
import { Endpoints } from 'src/entities/common.entity';
import { response } from 'src/utils/response.util';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  async createTrack(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = await validateId(id, Endpoints.TRACK, res, true);

    if (isValidIdAndTrack) {
      const favTrack = await this.favsService.createTrack(id);
      return response(HttpStatus.CREATED, favTrack, res);
    }
  }

  @Post('artist/:id')
  async createArtist(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = await validateId(
      id,
      Endpoints.ARTIST,
      res,
      true,
    );

    if (isValidIdAndArtist) {
      const favArtist = await this.favsService.createArtist(id);
      return response(HttpStatus.CREATED, favArtist, res);
    }
  }

  @Post('album/:id')
  async createAlbum(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = await validateId(id, Endpoints.ALBUM, res, true);

    if (isValidIdAndAlbum) {
      const favAlbum = this.favsService.createAlbum(id);
      return response(HttpStatus.CREATED, favAlbum, res);
    }
  }

  @Delete('track/:id')
  async removeTrack(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = await validateId(id, Endpoints.TRACK, res, true);

    if (isValidIdAndTrack) {
      await this.favsService.removeTrack(id);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }

  @Delete('artist/:id')
  async removeArtist(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = await validateId(id, Endpoints.ARTIST, res, true);

    if (isValidIdAndArtist) {
      await this.favsService.removeArtist(id);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }

  @Delete('album/:id')
  async removeAlbum(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = await validateId(id, Endpoints.ALBUM, res, true);

    if (isValidIdAndAlbum) {
      await this.favsService.removeAlbum(id);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    return response(HttpStatus.OK, await this.favsService.findAll(), res);
  }
}
