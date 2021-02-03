import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AboutController } from './about.controller';
import { AboutRepository } from './about.repository';
import { AboutService } from './about.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([AboutRepository])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AboutController);
  }
}
