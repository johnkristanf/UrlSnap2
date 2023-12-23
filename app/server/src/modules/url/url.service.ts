import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUrlDto } from './dto/create-url.dto';
import { ShortUrlDataTypes } from 'src/utils/types/shorturl';

import { ShortURL } from './model/shorturl';

import { generateShortUrl } from '../../utils/helpers/generateShortUrl';

import { Response } from 'express';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class UrlService {

  constructor(
    @InjectModel(ShortURL.name) private ShortUrlModel: Model<ShortURL>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(createUrlDto: CreateUrlDto): Promise<ShortUrlDataTypes> {

    try {
      
      createUrlDto.shortUrl = generateShortUrl();

      const create = new this.ShortUrlModel(createUrlDto);

      return await create.save();
      

    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Creating Short Url', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }


  async findAll(): Promise<ShortUrlDataTypes[]> {

    try {
      const shortuls = await this.ShortUrlModel.find({});

      await this.cacheManager.set('Allshortuls', shortuls)

      return await this.cacheManager.get('Allshortuls');
      
    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Fetching Url', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async findUrlByShortUrl(shortUrl: string): Promise<ShortUrlDataTypes> {

    try {
      const foundShortUrl = await this.ShortUrlModel.findOne({ shortUrl }).select('longUrl clicks').exec();
      
      if(foundShortUrl) await this.cacheManager.set('foundShortUrl', foundShortUrl);

      return await this.cacheManager.get('foundShortUrl');

    } catch (error) {
      console.error(error);
      throw new HttpException('Error finding URL', HttpStatus.NOT_FOUND);
      
    }

  }
  
  
  async redirectShortURL(shortUrl: string, res: Response): Promise<void> {

    try {

      const data: any = await this.findUrlByShortUrl(shortUrl);
  
      if (data) {
        this.incrementClicks(data._id, data.clicks);
        res.status(200).redirect(data.longUrl);

      }

    } catch (error) {
      console.error(error);
      throw new HttpException('Error redirecting URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  
  
  async incrementClicks(urlId: string, clicks: number): Promise<void> {

    try {
  
      await this.ShortUrlModel.findByIdAndUpdate(urlId, { clicks: clicks + 1 });

    } catch (error) {
      console.error(error);
      throw new HttpException('Error incrementing number of clicks', HttpStatus.INTERNAL_SERVER_ERROR);
    }


  }



  async remove(url_id: string): Promise<void> {

    try {
      await this.ShortUrlModel.findByIdAndDelete(url_id)
    
    } catch (error) {
      console.error(error);
      throw new HttpException('ERROR Deleting URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


}
