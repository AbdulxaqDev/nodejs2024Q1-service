import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const newArtist = await DBs[Endpoints.ARTIST].create({
      data: new CreateArtistDto(name, grammy),
    });

    return newArtist;
  }

  async findAll() {
    return await DBs[Endpoints.ARTIST].findMany();
  }

  async findOne(id: string) {
    const artist = DBs[Endpoints.ARTIST].findUnique({ where: { id } });
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await DBs[Endpoints.ARTIST].update({
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy,
      },
      where: { id },
    });
    return updatedArtist;
  }

  async remove(id: string) {
    await DBs[Endpoints.ARTIST].delete({ where: { id } });

    const album = await DBs[Endpoints.ALBUM].findFirst({
      where: { artistId: id },
    });

    const track = await DBs[Endpoints.TRACK].findFirst({
      where: { artistId: id },
    });

    if (album) {
      await DBs[Endpoints.ALBUM].update({
        data: { artistId: null },
        where: { artistId: id },
      });
    }

    if (track) {
      await DBs[Endpoints.TRACK].update({
        data: { artistId: null },
        where: { artistId: id },
      });
    }

  }
}
