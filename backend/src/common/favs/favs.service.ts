import { Injectable } from '@nestjs/common';
import { FavAlbumsDB, FavArtistsDB, FavTracksDB } from 'src/db/db';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class FavsService {
  createTrack(id: string) {
    FavTracksDB.push(id);
  }

  createArtist(id: string) {
    FavArtistsDB.push(id);
  }

  createAlbum(id: string) {
    FavAlbumsDB.push(id);
  }

  findAll() {
    const response = {
      tracks: [],
      artists: [],
      albums: [],
    };

    FavTracksDB.forEach((trackId) => {
      const track = DBs[Endpoints.TRACK].find((t) => t.id === trackId);
      if (track) response.tracks.push(track);
    });

    FavArtistsDB.forEach((artistId) => {
      const artist = DBs[Endpoints.ARTIST].find((t) => t.id === artistId);
      if (artist) response.artists.push(artist);
    });

    FavAlbumsDB.forEach((albumId) => {
      const album = DBs[Endpoints.ALBUM].find((t) => t.id === albumId);
      if (album) response.albums.push(album);
    });

    return response;
  }

  findFavTrack(id: string) {
    return DBs[Endpoints.TRACK].find((t) => t.id === id);
  }

  findFavArtist(id: string) {
    return DBs[Endpoints.ARTIST].find((a) => a.id === id);
  }

  findFavAlbum(id: string) {
    return DBs[Endpoints.ALBUM].find((a) => a.id === id);
  }

  removeTrack(id: string) {
    FavTracksDB.splice(FavTracksDB.indexOf(id), 1);
  }

  removeArtist(id: string) {
    FavArtistsDB.splice(FavArtistsDB.indexOf(id), 1);
  }

  removeAlbum(id: string) {
    FavAlbumsDB.splice(FavAlbumsDB.indexOf(id), 1);
  }
}
