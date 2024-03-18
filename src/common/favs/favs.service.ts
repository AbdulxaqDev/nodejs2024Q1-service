import { Injectable } from '@nestjs/common';
import { FavAlbumsDB, FavArtistsDB, FavTracksDB } from 'src/db/db';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class FavsService {
  createTrack(id: string) {
    FavTracksDB.push(id);
    console.log('adding track to fav: ', id);
  }

  createArtist(id: string) {
    FavArtistsDB.push(id);
    console.log('adding artist to fav: ', id);
  }

  createAlbum(id: string) {
    FavAlbumsDB.push(id);
    console.log('adding album to fav: ', id);
  }

  findAll() {
    const response = {
      tracks: FavTracksDB.map((trackId) =>
        DBs[Endpoints.TRACK].find((t) => t.id === trackId),
      ),
      artists: FavArtistsDB.map((artistId) =>
        DBs[Endpoints.ARTIST].find((a) => a.id === artistId),
      ),
      albums: FavAlbumsDB.map((albumId) =>
        DBs[Endpoints.ALBUM].find((a) => a.id === albumId),
      ),
    };

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
