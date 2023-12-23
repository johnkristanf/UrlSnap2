import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,  {
    
    logger: ['error', 'debug'],
    
    cors: {
      origin: 'https://urlsnap.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Content-Length', 'Content-Disposition']
    }
    
  });

  const path = process.env.NODE_ENV === 'production' ? '../../.env.production' : '../.env';
    
  dotenv.config({ path: path });

  await app.listen(5000);

}
bootstrap();
