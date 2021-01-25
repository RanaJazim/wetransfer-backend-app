import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AboutService } from './about.service';
import { AboutDto, AboutFormDto } from './dtos';
import { uploadImageConfig } from '../utils/img_upload';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  async about(): Promise<AboutDto> {
    return this.aboutService.get();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: uploadImageConfig() }))
  async create(
    @Body(ValidationPipe) about: AboutFormDto,
    @UploadedFile() file,
  ): Promise<AboutDto> {
    about.imagePath = file.path;
    return this.aboutService.create(about);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) about: AboutFormDto,
  ): Promise<AboutDto> {
    return this.aboutService.update(about, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    await this.aboutService.delete(id);
    return 'Successfully deleted';
  }
}
