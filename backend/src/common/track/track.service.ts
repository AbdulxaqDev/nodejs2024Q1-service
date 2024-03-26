import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DBs, Endpoints } from 'src/entities/common.entity';
import { Track } from './entities/track.entity';

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

  findOne(id: string) {
    const track = DBs[Endpoints.TRACK].find((t) => t.id === id);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track: Track = DBs[Endpoints.TRACK].find((t) => t.id === id);
    const { name, artistId, albumId, duration } = updateTrackDto;
    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;
    return track;
  }

  remove(track: Track) {
    const trackDb = DBs[Endpoints.TRACK];
    trackDb.splice(trackDb.indexOf(track), 1);
  }
}
