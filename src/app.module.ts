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
import { AuthModule } from './common/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwtauth.guard';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(ErrorLoggingMiddleware).forRoutes('*');
  }
}
