import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

import * as bodyParser from 'body-parser'

console.log('db', process.env.MONGODB_URI)

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'log', 'error'] });

  app.enableCors({
    origin: 'https://urlsnap.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Content-Length', 'Content-Disposition'],

  })

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

 
 
  const path = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
    
  dotenv.config({ path: path });

  await app.listen(5000);

}
bootstrap();
