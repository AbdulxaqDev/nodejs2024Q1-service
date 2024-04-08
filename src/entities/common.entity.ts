import { PrismaService } from 'src/services/prisma.service';

const prisma: PrismaService = new PrismaService();

export enum Endpoints {
  USER = 'user',
  ARTIST = 'artist',
  TRACK = 'track',
  ALBUM = 'album',
}

export const DBs: Record<Endpoints, any> = {
  [Endpoints.USER]: prisma.user,
  [Endpoints.ARTIST]: prisma.artist,
  [Endpoints.TRACK]: prisma.track,
  [Endpoints.ALBUM]: prisma.album,
};
