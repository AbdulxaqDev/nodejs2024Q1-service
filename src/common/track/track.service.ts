import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const newTrack = new CreateTrackDto(name, artistId, albumId, duration);
    DBs[Endpoints.TRACK].push(newTrack);
    return newTrack;
  }

  findAll() {
    return DBs[Endpoints.TRACK];
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
