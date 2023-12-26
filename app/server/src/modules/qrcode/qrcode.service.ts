import { HttpException, HttpStatus, Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';

import { CreateQrcodeDto } from './dto/create-qrcode.dto';

import  { QrCodeWithTypes, QrCodeContentType, 
         QrCodeFormat, 
         QrCodeResolution, 

        } from 'src/utils/types/qrcode';

import * as qrcode from 'qrcode';

import { bufferQrCodeToBase64 } from 'src/utils/helpers/buffer';
import { generateShortUrl } from 'src/utils/helpers/generateShortUrl';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QrCode } from './model/qrcode';
import { HttpService } from '@nestjs/axios';

import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class QrcodeService {

  constructor(
    @InjectModel(QrCode.name) private readonly qrcodeModel: Model<QrCode>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}


  async generateDownloadableQrCode(createQrcodeDto: CreateQrcodeDto) {
    
    try {

      const generatedQrCode = await this.generateQrCode(createQrcodeDto);

        const downloadableQrCode = {
          qrCodeLongURL: createQrcodeDto.qrCodeURL,
          qrCodeShortURL: generateShortUrl(),
          qrCode: Buffer.from(generatedQrCode.split(',')[1]),

          qrCodeBgColor: createQrcodeDto.qrcode_bgcolor,
          qrCodeForegroundColor: createQrcodeDto.qrcode_foregroundcolor,
          resolution: createQrcodeDto.resolution

        }

        const saveQr = new this.qrcodeModel(downloadableQrCode);

        await saveQr.save();
      
    } catch (error) {
      console.error(error);
      throw new HttpException('Error Creating QrCode', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }


  async generateCustomizableQrCode(qrCodeColors: CreateQrcodeDto, res: Response): Promise<void> {

    try {

      const generatedCustomizableQrCode = await this.generateQrCode(qrCodeColors);

      await this.cacheManager.set('generatedCustomizableQrCode', bufferQrCodeToBase64(generatedCustomizableQrCode))

      const getGeneratedCustomizableQrCode = await this.cacheManager.get('generatedCustomizableQrCode')

      res.setHeader('Content-Type', QrCodeContentType.PNG);
      res.status(200).send(getGeneratedCustomizableQrCode);


    } catch (error) {
      console.error(error);
      throw new HttpException('Error Fetching Customizable Qr Code', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async generateQrCode(qrCodeData: CreateQrcodeDto): Promise<string> {

    try {

      const qrCode: string = await qrcode.toDataURL(qrCodeData.qrCodeURL || 'Customizable Qr Code', {
        errorCorrectionLevel: qrCodeData.resolution as QrCodeResolution.High | QrCodeResolution.Medium | QrCodeResolution.Low,

        color: {
          dark: qrCodeData.qrcode_foregroundcolor, 
          light: qrCodeData.qrcode_bgcolor, 
        }
  
      });
  
      return qrCode;
      
    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Generating QrCode', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    
  }  


 
  async findAll(res: Response): Promise<void> {

    try {

      const allQrCodes = await this.qrcodeModel.find({});

      await this.cacheManager.set('qrCodes', allQrCodes);

      const getAllQrCodes = await this.cacheManager.get('qrCodes');

      res.status(200).send(getAllQrCodes);

      
    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Fetching All QrCodes', HttpStatus.INTERNAL_SERVER_ERROR)
    } 

  }



  async redirectShortURL(shortUrl: string, res: Response): Promise<void> {

    try {
      
      const data: any = await this.qrcodeModel.findOne({ qrCodeShortURL: shortUrl });
  
      if (data) res.status(200).redirect(data.qrCodeLongURL);


    } catch (error) {
      console.error(error);
      throw new HttpException('Error redirecting URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async downloadQrCode(format: string, qrcode_id: string, res: Response){

    try {
      
      const qrcodeData = await this.qrcodeModel.findById(qrcode_id);

      const getDownloadableQrCode = await this.generateQrCodeWithTypes(format, qrcodeData);


      switch (format) {

        case QrCodeFormat.PNG:
          this.DownloadQrCodeSetHeaders(QrCodeFormat.PNG, res)
          break;
  
        case QrCodeFormat.JPEG:
          this.DownloadQrCodeSetHeaders(QrCodeFormat.JPEG, res)
          break;
  
        case QrCodeFormat.WEBP:
          this.DownloadQrCodeSetHeaders(QrCodeFormat.WEBP, res)
          break;
    
        default:
          throw new Error('Invalid format');
      }


      res.status(200).send(bufferQrCodeToBase64(getDownloadableQrCode));

    

    } catch (error) {
      console.error(error);
      throw new HttpException('Error redirecting URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  DownloadQrCodeSetHeaders(format: string, res: Response) {

    let contentType = `image/${format}`;

    let filename = `qrcode.${format}`;
  
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}" ` );

  }


 
  async generateQrCodeWithTypes(format: string, qrCodeData: QrCodeWithTypes): Promise<string> {

    try {

      const qrCode: string = await qrcode.toDataURL(qrCodeData.qrCodeLongURL, {

        errorCorrectionLevel: qrCodeData.resolution as QrCodeResolution.High | QrCodeResolution.Medium | QrCodeResolution.Low,

        type: `image/${format}` as QrCodeContentType.PNG | QrCodeContentType.JPEG | QrCodeContentType.WEBP,

        color: {
          dark: qrCodeData.qrCodeForegroundColor, 
          light: qrCodeData.qrCodeBgColor, 
        }
  
      });
  
      return qrCode;
      
    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Generating QrCode', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    
  }  




  async remove(qrCode_id: string) {

    try {
      return await this.qrcodeModel.findByIdAndDelete(qrCode_id)


    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Deleting QrCodes', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }
}
