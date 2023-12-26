import { Module } from '@nestjs/common';
import { UrlModule } from './modules/url/url.module';
import { QrcodeModule } from './modules/qrcode/qrcode.module';
import { ConvertModule } from './modules/convert/convert.module';
import { FileRemovalModule } from './modules/fileremoval/fileremoval.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    UrlModule, 
    QrcodeModule,
    ConvertModule,
    FileRemovalModule,

    ScheduleModule.forRoot(),
    
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.production', '.env']
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')
      }),

      inject: [ConfigService]
    })

  ],

  controllers: [],
  providers: [],

  
})
export class AppModule {}
