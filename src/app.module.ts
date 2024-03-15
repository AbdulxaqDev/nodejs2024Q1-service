import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './common/user/user.module';
import { TrackModule } from './common/track/track.module';
import { ArtistModule } from './common/artist/artist.module';
import { AlbumModule } from './common/album/album.module';
import { FavsModule } from './common/favs/favs.module';
import { TesterModule } from './tester/tester.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavsModule, TesterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
