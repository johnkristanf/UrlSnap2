import { Body, Controller, Param, Post, Get, Res, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { ConvertService } from './convert.service';
import { convertTypes } from 'src/utils/types/convert';

import { Response } from 'express';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}


  @Post()
  async convertYTURLToMp3(@Body() data: convertTypes, @Res() res : Response){
    return this.convertService.convert(data.youtubeURL, res);

  }


  @Get('title/:ytUrl')
  @UseInterceptors(CacheInterceptor)
  async getAudioTitle(@Param('ytUrl') ytUrl: string) {
    return this.convertService.mp3Title(ytUrl);
  }

  
  

}
