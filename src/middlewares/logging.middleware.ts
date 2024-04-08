import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, headers, body, query } = req;
    const requestLog = {
      method,
      url,
      headers,
      body,
      query,
    };
    this.logger.log(JSON.stringify(requestLog, null, 4), 'Incoming Request'.toUpperCase());
    next();
  }
}