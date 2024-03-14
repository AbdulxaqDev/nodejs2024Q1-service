import { AlbumsDB, ArtistsDB, TracksDB, UsersDB } from 'src/db/db';

export enum Endpoints {
  user = 'user',
  artist = 'artist',
  track = 'track',
  album = 'album',
}

export const DBs = {
  user: UsersDB,
  artist: ArtistsDB,
  track: TracksDB,
  album: AlbumsDB,
};
