import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Endpoints } from 'src/entities/common.entity';
import { response } from 'src/utils/response.util';
import { Response } from 'express';
import { validateId } from 'src/utils/id-validator.util';

@Controller(Endpoints.ALBUM)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    const isValidIdAndArtist =
      createAlbumDto.artistId === null
        ? true
        : await validateId(createAlbumDto.artistId, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      const createdAlbum = await this.albumService.create(createAlbumDto);
      return response(HttpStatus.CREATED, createdAlbum, res);
    }
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = await validateId(id, Endpoints.ALBUM, res);
    if (isValidIdAndAlbum) {
      const album = await this.albumService.findOne(id);
      return response(HttpStatus.OK, album, res);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    const isValidIdAndAlbum = await validateId(id, Endpoints.ALBUM, res);
    const isValidIdAndArtist = await validateId(
      updateAlbumDto.artistId,
      Endpoints.ARTIST,
      res,
    );

    if (isValidIdAndAlbum && isValidIdAndArtist) {
      const updatedAlbum = await this.albumService.update(id, updateAlbumDto);
      return response(HttpStatus.OK, updatedAlbum, res);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = await validateId(id, Endpoints.ALBUM, res);

    if (isValidIdAndAlbum) {
      await this.albumService.remove(id);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }
}
