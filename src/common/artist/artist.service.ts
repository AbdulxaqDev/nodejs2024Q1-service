import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';
import { response } from 'src/utils/response.util';
import { Response } from 'express';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const newArtist = new CreateArtistDto(name, grammy);

    DBs[Endpoints.ARTIST].push(newArtist);

    return newArtist;
  }

  findAll() {
    return DBs[Endpoints.ARTIST];
  }

  findOne(id: string) {
    return `This action returns a #${id} artist`;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = DBs[Endpoints.ARTIST].find((u) => u.id === id);
    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
