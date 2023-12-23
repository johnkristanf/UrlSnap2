import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import * as ytdl from 'ytdl-core';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';


import { Response } from 'express';




@Injectable()
export class ConvertService {
    
    async convert(ytUrl: string): Promise<string>{

        try {

            const videoInfo = await ytdl.getInfo(ytUrl);

            const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
                quality: 'highestaudio'
            });


            if (!audioFormat){
                throw new HttpException('ERROR Audio format not found', HttpStatus.NOT_FOUND);
            } 

            const audioStream = ytdl.downloadFromInfo(videoInfo, { format: audioFormat });

            const filePath = `./downloads/${videoInfo.videoDetails.title}.mp3`;



            await new Promise((resolve, reject) => {
                ffmpeg(audioStream)
                .audioBitrate(128)
                .save(filePath)
                .on('end', () => resolve(filePath))
                .on('error', (err) => reject(err));
            });


            return filePath;
              

            
        } catch (error) {
            console.error(error)
            throw new HttpException('ERROR Converting YT URL to MP3', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }


    async download(filePath: string, res: Response){

        const splitPath = filePath.split('/');

        const audioTittle = splitPath[splitPath.length -1 ];

        this.setAudioHeader(audioTittle, res)
       
        this.sendFileStreamToRequest(filePath, res)
       
    }

    
    sendFileStreamToRequest(filePath: string, res: Response){

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('close', () => {
            fs.unlinkSync(filePath);
        });
    }


    setAudioHeader(audioTittle: string, res: Response){
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', `attachment; filename="${audioTittle}"`);
    }


    next(filePath: string){
        fs.unlinkSync(filePath);
    }
}
