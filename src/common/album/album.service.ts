import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const newAlbum = new CreateAlbumDto(name, year, artistId);

    DBs[Endpoints.ALBUM].push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return DBs[Endpoints.ALBUM];
  }

  findOne(id: string) {
    const album = DBs[Endpoints.ALBUM].find((a) => a.id === id);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    // const album = this.findOne(id);
    // album.name = updateAlbumDto.name;
    // album.year = updateAlbumDto.year;
    // album.artistId = updateAlbumDto.artistId;
    let album = this.findOne(id);
    album = updateAlbumDto;
    return album;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
