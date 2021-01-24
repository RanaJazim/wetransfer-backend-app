import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AboutController } from './about.controller';
import { AboutRepository } from './about.repository';
import { AboutService } from './about.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutRepository])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
