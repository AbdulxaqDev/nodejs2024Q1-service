import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';
import { Artist } from './entities/artist.entity';

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

  remove(artist: Artist) {
    const artistsDb = DBs[Endpoints.ARTIST];
    artistsDb.splice(artistsDb.indexOf(artist), 1);
  }
}
