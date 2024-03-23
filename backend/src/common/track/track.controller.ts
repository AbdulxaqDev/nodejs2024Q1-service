import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { response } from 'src/utils/response.util';
import { Response } from 'express';
import { validateId } from 'src/utils/id-validator.util';
import { Endpoints } from 'src/entities/common.entity';

@Controller(Endpoints.TRACK)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    const newTrack = this.trackService.create(createTrackDto);
    return response(HttpStatus.CREATED, newTrack, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return response(HttpStatus.OK, this.trackService.findAll(), res);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      return response(HttpStatus.OK, this.trackService.findOne(id), res);
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    const isValidIdAndTrack = validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      return response(
        HttpStatus.OK,
        this.trackService.update(id, updateTrackDto),
        res,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    const isValidIdAndTrack = validateId(id, Endpoints.TRACK, res);

    if (isValidIdAndTrack) {
      this.trackService.remove(isValidIdAndTrack);
      return response(HttpStatus.NO_CONTENT, 'User deleted', res);
    }
  }
}
