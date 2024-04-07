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
  async create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    const createdArtist = await this.artistService.create(createArtistDto);
    return response(HttpStatus.CREATED, createdArtist, res);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const artists = await this.artistService.findAll();
    return response(HttpStatus.OK, artists, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = await validateId(id, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      const artist = await this.artistService.findOne(id);
      return response(HttpStatus.OK, artist, res);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    const isValidIdAndArtist = await validateId(id, Endpoints.ARTIST, res);
    if (isValidIdAndArtist) {
      const updatedArtist = await this.artistService.update(id, updateArtistDto);
      return response(HttpStatus.OK, updatedArtist, res);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndArtist = await validateId(id, Endpoints.ARTIST, res);

    if (isValidIdAndArtist) {
      await this.artistService.remove(id);
      return response(HttpStatus.NO_CONTENT, null, res);
    }
  }
}
