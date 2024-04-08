import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './common/user/user.module';
import { TrackModule } from './common/track/track.module';
import { ArtistModule } from './common/artist/artist.module';
import { AlbumModule } from './common/album/album.module';
import { FavsModule } from './common/favs/favs.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { ErrorLoggingMiddleware } from './middlewares/error-logging.middleware';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(ErrorLoggingMiddleware).forRoutes('*');
  }
}
