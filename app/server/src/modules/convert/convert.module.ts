import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ConvertService } from './convert.service';
import { ConvertController } from './convert.controller';

import { PayloadLoggerMiddleware } from 'src/middlewares/payload.middlware';


@Module({
  imports: [CacheModule.register()],
  controllers: [ConvertController],
  providers: [ConvertService],
})

export class ConvertModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PayloadLoggerMiddleware).forRoutes('*');
  }
}
