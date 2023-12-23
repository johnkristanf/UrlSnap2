import { HttpException, HttpStatus, Injectable, Logger  } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';

import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class FileRemovalService {
    
    private readonly logger = new Logger(FileRemovalService.name);

    @Cron(CronExpression.EVERY_DAY_AT_8AM, {
        name: 'removeUndownloadMp3',
        timeZone: 'Asia/Manila', 
    })


    @Timeout('removeUndownloadMp3', 1)
    handleCronForRemovingUndownloadMp3() {
      this.logger.debug('Called every day');

      const folderPath = 'C:/Users/John Kristan/Desktop/UrlSnap/app/server/src/modules/convert/downloads';

      this.removeUndownloadMp3(folderPath);

    }

    
    private removeUndownloadMp3(folderPath: string): void{

        fs.readdir(folderPath, (err, files) => {

            if(err) throw new HttpException('ERROR Reading File inside Downloads Folder', HttpStatus.INTERNAL_SERVER_ERROR);

            for(const file of files){

                const filePath = path.join(folderPath, file);

                fs.stat(filePath, (err, stat) => {

                    if(err) throw new HttpException('ERROR Reading File Stat', HttpStatus.INTERNAL_SERVER_ERROR);

                    if(stat.isFile()){

                        fs.unlink(filePath, (err) => {
                            if(err) throw new HttpException('ERROR Removing File', HttpStatus.INTERNAL_SERVER_ERROR);

                            console.log('File removed successfully:', filePath);
                        })
                    }
                })
            }
        })

    }
}
