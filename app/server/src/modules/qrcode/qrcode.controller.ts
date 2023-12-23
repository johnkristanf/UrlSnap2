import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';

import { Response } from 'express';


@Controller()
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post()
  create(@Body() createQrcodeDto: CreateQrcodeDto) {
    return this.qrcodeService.generateDownloadableQrCode(createQrcodeDto);
  }


  @Get('customizable/:backgroundColor/:foregroundColor')

  fetchCustomizableQrCode(
    @Param('backgroundColor') qrcode_bgcolor: string,
    @Param('foregroundColor') qrcode_foregroundcolor: string,
    @Res() res: Response ) {

      const qrCodeColors = {
        qrcode_bgcolor,
        qrcode_foregroundcolor
      }

    return this.qrcodeService.generateCustomizableQrCode(qrCodeColors, res);
    
  }


  @Get('all/qrcodes')
  findAll(@Res() res: Response) {
    return this.qrcodeService.findAll(res);
  }

  
  @Get('qr/:ShortUrl')
  redirectShortURL(@Param('ShortUrl') shortUrl: string, @Res() res: Response) {
    return this.qrcodeService.redirectShortURL(shortUrl, res);
  }

  
  @Get('download/qrcode/:format/:qrcode_id')

  downloadQrCode(
    @Param('format') format: string, 
    @Param('qrcode_id') qrcode_id: string, 
    @Res() res: Response ) {
    return this.qrcodeService.downloadQrCode(format, qrcode_id, res);
  }


  @Post('fb/post')
  
  async postURLToFacebook(@Body() data: { url: string }): Promise<void> {
   
    try {

      const { url } = data;
     
      await this.qrcodeService.postURLToFacebook(url);
      
    } catch (error) {
      console.error('Error posting URL to Facebook:', error.message);
      throw error;
    }
  }

  
  @Delete(':qrCode_id')
  remove(@Param('qrCode_id') qrCode_id: string) {
    return this.qrcodeService.remove(qrCode_id);
  }
}
