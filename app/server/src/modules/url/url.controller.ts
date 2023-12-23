import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

import { Response } from 'express';


@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('url')
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }


  
  @Get()
  findAll() {
    return this.urlService.findAll();
  }



  @Get(':shortUrl')
  redirectShortURL(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    return this.urlService.redirectShortURL(shortUrl, res);
  }



  @Delete('url/:url_id')
  remove(@Param('url_id') url_id: string) {
    return this.urlService.remove(url_id);

  }
}
