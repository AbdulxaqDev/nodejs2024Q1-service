import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        const errorLog = {
          statusCode: res.statusCode,
          message: res.statusMessage,
          path: req.url,
        };
        this.logger.error(
          JSON.stringify(errorLog, null, 4),
          'ERROR OCCURRED',
        );
      }
    });

    next();
  }
}
