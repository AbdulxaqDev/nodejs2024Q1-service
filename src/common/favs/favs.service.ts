import { Injectable } from '@nestjs/common';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class FavsService {
  async createTrack(id: string) {
    return await DBs[Endpoints.TRACK].update({
      data: {
        fav: true,
      },
      where: {
        id,
      },
    });
  }

  async createArtist(id: string) {
    return await DBs[Endpoints.ARTIST].update({
      data: {
        fav: true,
      },
      where: {
        id,
      },
    });
  }

  async createAlbum(id: string) {
    return await DBs[Endpoints.ALBUM].update({
      data: {
        fav: true,
      },
      where: {
        id,
      },
    });
  }

  async removeTrack(id: string) {
    return await DBs[Endpoints.TRACK].update({
      data: {
        fav: false,
      },
      where: {
        id,
      },
    });
  }

  async removeArtist(id: string) {
    return await DBs[Endpoints.ARTIST].update({
      data: {
        fav: false,
      },
      where: {
        id,
      },
    });
  }

  async removeAlbum(id: string) {
    return await DBs[Endpoints.ALBUM].update({
      data: {
        fav: false,
      },
      where: {
        id,
      },
    });
  }

  async findAll() {
    const getFavs = {
      where: { fav: true },
      select: { id: true },
    };

    const tracks = await DBs[Endpoints.TRACK].findMany(getFavs);
    const artists = await DBs[Endpoints.ARTIST].findMany(getFavs);
    const albums = await DBs[Endpoints.ALBUM].findMany(getFavs);

    const trackIds = tracks.map((track) => track.id);
    const artistIds = artists.map((artist) => artist.id);
    const albumIds = albums.map((album) => album.id);

    return {
      tracks: trackIds,
      artists: artistIds,
      albums: albumIds,
    };
  }
}
