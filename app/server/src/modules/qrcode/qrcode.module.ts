import { Module } from '@nestjs/common';

import { QrcodeService } from './qrcode.service';

import { QrcodeController } from './qrcode.controller';

import { QrCodeSchema, QrCode } from './model/qrcode';

import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  
  imports: [

    CacheModule.register(),

    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    
    MongooseModule.forFeature([{ name: QrCode.name , schema: QrCodeSchema }])
  ],
  
  controllers: [QrcodeController],
  providers: [QrcodeService],
})
export class QrcodeModule {}
