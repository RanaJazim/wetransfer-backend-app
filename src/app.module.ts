import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmOptions } from './config/typeorm.config';
import { AboutModule } from './about/about.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmOptions),
    AboutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
