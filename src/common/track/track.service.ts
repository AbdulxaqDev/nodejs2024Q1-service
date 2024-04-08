import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const newTrack = await DBs[Endpoints.TRACK].create({
      data: new CreateTrackDto(name, artistId, albumId, duration),
    });

    return newTrack;
  }

  async findAll() {
    return await DBs[Endpoints.TRACK].findMany();
  }

  async findOne(id: string) {
    return await DBs[Endpoints.TRACK].findUnique({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;
    const updatedTrack = await DBs[Endpoints.TRACK].update({
      data: {
        name,
        artistId,
        albumId,
        duration,
      },
      where: { id },
    });

    return updatedTrack;
  }

  async remove(id: string) {
    await await DBs[Endpoints.TRACK].delete({where: {id}});
  }
}
