import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Header,
  Res,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validateId } from 'src/utils/id-validator.util';
import { Response } from 'express';
import { response } from 'src/utils/response.util';
import { Endpoints } from 'src/entities/common.entity';

@Controller(Endpoints.ARTIST)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto) {
    const createdArtist = this.artistService.create(createArtistDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: createdArtist,
      error: null,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  findAll() {
    const artists = this.artistService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: artists,
      error: null,
    };
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = validateId(id, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      return response(HttpStatus.OK, isValidIdAndArtist, null, res);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    const isValidIdAndArtist = validateId(id, Endpoints.ARTIST, res);
    if (isValidIdAndArtist) {
      const updatedArtist = this.artistService.update(id, updateArtistDto);
      return response(HttpStatus.OK, updatedArtist, null, res);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = validateId(id, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      this.artistService.remove(isValidIdAndArtist);
      return response(HttpStatus.NO_CONTENT, 'User deleted', null, res);
    }
  }
}
