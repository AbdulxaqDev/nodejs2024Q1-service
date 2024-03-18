import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';
import { Album } from './entities/album.entity';
import { Track } from '../track/entities/track.entity';

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

  findOne(id: string): Album {
    const album = DBs[Endpoints.ALBUM].find((a) => a.id === id);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, year, artistId } = updateAlbumDto;
    const album = this.findOne(id);
    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  remove(album: Album) {
    const albumDb = DBs[Endpoints.ALBUM];

    const artistFromTrack: Track = DBs[Endpoints.TRACK].find(
      (track) => track.albumId === album.id,
    );

    if (artistFromTrack) artistFromTrack.albumId = null;

    albumDb.splice(albumDb.indexOf(album), 1);
  }
}
