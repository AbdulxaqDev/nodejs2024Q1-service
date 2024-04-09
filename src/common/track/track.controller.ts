import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { response } from 'src/utils/response.util';
import { Response } from 'express';
import { validateId } from 'src/utils/id-validator.util';
import { Endpoints } from 'src/entities/common.entity';

@Controller(Endpoints.TRACK)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    const isValidIdAndArtist =
      createTrackDto.artistId === null
        ? true
        : await validateId(createTrackDto.artistId, Endpoints.ARTIST, res);
    const isValidIdAndAlbum =
      createTrackDto.albumId === null
        ? true
        : await validateId(createTrackDto.albumId, Endpoints.ALBUM, res);

    if (isValidIdAndAlbum && isValidIdAndArtist) {
      const newTrack = await this.trackService.create(createTrackDto);
      return response(HttpStatus.CREATED, newTrack, res);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    return response(HttpStatus.OK, await this.trackService.findAll(), res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = await validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      return response(HttpStatus.OK, await this.trackService.findOne(id), res);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    const isValidIdAndTrack = await validateId(id, Endpoints.TRACK, res);

    const isValidIdAndArtist =
      updateTrackDto.artistId === null
        ? true
        : await validateId(updateTrackDto.artistId, Endpoints.ARTIST, res);
    const isValidIdAndAlbum =
      updateTrackDto.albumId === null
        ? true
        : await validateId(updateTrackDto.albumId, Endpoints.ALBUM, res);

    if (isValidIdAndTrack && isValidIdAndAlbum && isValidIdAndArtist) {
      return response(
        HttpStatus.OK,
        await this.trackService.update(id, updateTrackDto),
        res,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = await validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      await this.trackService.remove(id);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }
}
