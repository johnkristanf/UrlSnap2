import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ConvertService } from './convert.service';

import { convertTypes } from 'src/utils/types/convert';
import { Response } from 'express';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Post()
  async convertYTURLToMp3(@Body() data: convertTypes){
    return this.convertService.convert(data.youtubeURL);

  }


  @Get(':filePath')
  downloadAudio(@Param('filePath') filePath: string, @Res() res: Response){
    return this.convertService.download(filePath, res)
    
  }

  
  @Get('next/:filePath')
  convertNext(@Param('filePath') filePath: string){
    return this.convertService.next(filePath)
    
  }

}
