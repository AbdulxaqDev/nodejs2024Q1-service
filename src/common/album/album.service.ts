import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const newAlbum = DBs[Endpoints.ALBUM].create({
      data: new CreateAlbumDto(name, year, artistId),
    });

    return newAlbum;
  }

  async findAll() {
    return await DBs[Endpoints.ALBUM].findMany();
  }

  async findOne(id: string) {
    const album = DBs[Endpoints.ALBUM].findUnique({
      where: {
        id,
      },
    });
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const updatedAlbum = DBs[Endpoints.ALBUM].update({
      data: {
        name,
        year,
        artistId,
      },
      where: {
        id,
      },
    });

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    await DBs[Endpoints.ALBUM].delete({
      where: { id },
    });

    const track = await DBs[Endpoints.TRACK].findFirst({
      where: { albumId: id },
    });

    if (track) {
      await DBs[Endpoints.TRACK].update({
        data: { albumId: null },
        where: { albumId: id },
      });
    }
  }
}
