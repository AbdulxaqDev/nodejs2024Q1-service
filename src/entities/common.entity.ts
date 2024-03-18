import { AlbumsDB, ArtistsDB, TracksDB, UsersDB } from 'src/db/db';

export enum Endpoints {
  USER = 'user',
  ARTIST = 'artist',
  TRACK = 'track',
  ALBUM = 'album',
}

export const DBs: Record<Endpoints, any[]> = {
  [Endpoints.USER]: UsersDB,
  [Endpoints.ARTIST]: ArtistsDB,
  [Endpoints.TRACK]: TracksDB,
  [Endpoints.ALBUM]: AlbumsDB,
};
