import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

import { ShortURLSchema, ShortURL } from './model/shorturl';

@Module({

  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([{ name: ShortURL.name, schema: ShortURLSchema }]),
  ],
  
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
