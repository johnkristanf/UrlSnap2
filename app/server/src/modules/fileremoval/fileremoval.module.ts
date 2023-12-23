import { Module } from '@nestjs/common';
import { FileRemovalService } from './fileremoval.service';

@Module({
  providers: [FileRemovalService]
})

export class FileRemovalModule {}
