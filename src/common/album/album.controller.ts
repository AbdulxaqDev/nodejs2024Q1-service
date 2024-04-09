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
  create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    const isValidIdAndArtist =
      createAlbumDto.artistId === null
        ? true
        : validateId(createAlbumDto.artistId, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      const createdAlbum = this.albumService.create(createAlbumDto);
      return response(HttpStatus.CREATED, createdAlbum, res);
    }
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = validateId(id, Endpoints.ALBUM, res);
    if (isValidIdAndAlbum)
      return response(HttpStatus.OK, this.albumService.findOne(id), res);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    const isValidIdAndAlbum = validateId(id, Endpoints.ALBUM, res);

    if (isValidIdAndAlbum) {
      const updatedAlbum = this.albumService.update(id, updateAlbumDto);
      return response(HttpStatus.OK, updatedAlbum, res);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndAlbum = validateId(id, Endpoints.ALBUM, res);

    if (isValidIdAndAlbum) {
      this.albumService.remove(isValidIdAndAlbum);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }
}
