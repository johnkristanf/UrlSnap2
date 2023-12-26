import { Injectable, HttpException, HttpStatus, Logger, Inject } from '@nestjs/common';

import * as ytdl from 'ytdl-core';

import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';


import { Response } from 'express';
import { Readable } from 'stream';




@Injectable()
export class ConvertService {

    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}

    private readonly logger = new Logger(ConvertService.name);

    private setAudioDownloadHeader(res: Response){
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'public, max-age=604800000');
        res.setHeader('Content-Disposition', `attachment; filename="audio.mp3"`);
    }
    
    
    
    async convert(ytUrl: string, res: Response): Promise<void> {

        try {

            const ytUrl_id = ytUrl.split('=')[1];

            const cacheKey = `video_${ytUrl_id}`;

            const cacheBufferExist = await this.cacheManager.get<Buffer>(cacheKey);


            if(cacheBufferExist){
                await this.passExistingCachedStream(cacheBufferExist, res);
                return;
            }


            const audioStream = await this.convertURLtoAudioStream(ytUrl);

               this.passNewlyCachedStream(audioStream, res);

               this.setStreamCache(audioStream, cacheKey);
              


        } catch (error) {
            this.logger.error(error);
            throw new HttpException('ERROR Converting YT URL to MP3', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    setStreamCache(audioStream: Readable, cacheKey: string) {

        const chunks: Buffer[] = [];

        audioStream.on('data', (chunk) => {
          chunks.push(chunk);
        });
  
        audioStream.on('end', async () => {
          const concatenatedChunks = Buffer.concat(chunks);
          await this.cacheManager.set(cacheKey, concatenatedChunks, 3600); 

        });
    }


    async passExistingCachedStream(cacheBuffer: Buffer, res: Response) {


        if(cacheBuffer){

            this.setAudioDownloadHeader(res);

            const stream = new Readable();
            stream.push(cacheBuffer);
            stream.push(null); 

            stream.pipe(res);

            return true;
        }

    }


    passNewlyCachedStream(audioStream: Readable, res: Response) {

        this.setAudioDownloadHeader(res);

        audioStream.pipe(res);

    }


    async convertURLtoAudioStream(ytUrl: string): Promise<Readable> {

        try {

            const videoInfo = await ytdl.getInfo(ytUrl);

            const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
                quality: 'highestaudio'
            });

            if (!audioFormat) {
                throw new HttpException('ERROR Audio format not found', HttpStatus.NOT_FOUND);
            }


            return ytdl.downloadFromInfo(videoInfo, { format: audioFormat });

            
        } catch (error) {
            this.logger.error(error);
            throw new HttpException('ERROR CONVERTING URL TO STREAM', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    async mp3Title(ytUrl: string): Promise<string> {

      try {

        const data = await ytdl.getInfo(ytUrl);

        const { title } = data.videoDetails;

        return title || 'No Tittle Found';

      } catch (error) {
        this.logger.error('Error:', error);
      }

    } 
      


   
}
