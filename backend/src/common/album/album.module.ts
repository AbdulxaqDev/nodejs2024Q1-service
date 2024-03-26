import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { IdValidator } from './validators/artist-id.validator';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, IdValidator],
})
export class AlbumModule {}
