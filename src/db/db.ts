import { User } from 'src/common/user/entities/user.entity';
import { Track } from 'src/common/track/entities/track.entity';
import { Artist } from 'src/common/artist/entities/artist.entity';
import { Album } from 'src/common/album/entities/album.entity';
import { Favorites } from 'src/common/favs/entities/fav.entity';

export const UsersDB: User[] = [];
export const TracksDB: Track[] = [];
export const ArtistsDB: Artist[] = [];
export const AlbumsDB: Album[] = [];

export const FavTracksDB: string[] = [];
export const FavArtistsDB: string[] = [];
export const FavAlbumsDB: string[] = [];