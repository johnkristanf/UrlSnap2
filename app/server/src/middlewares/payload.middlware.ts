// create a new file payload-logger.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PayloadLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('PayloadLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const contentLength = req.headers['content-length'];
    this.logger.debug(`Request payload size: ${contentLength} bytes`);
    next();
  }
}
