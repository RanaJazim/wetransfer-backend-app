import {
  BadRequestException,
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
import { fileFilter, uploadImageConfig } from '../utils/img_upload';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  async about(): Promise<AboutDto> {
    return this.aboutService.get();
  }

  @Get('/single')
  async single(): Promise<AboutDto> {
    return this.aboutService.getSingle();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: uploadImageConfig() }))
  async create(
    @Body(ValidationPipe) about: AboutFormDto,
    @UploadedFile() file,
  ): Promise<AboutDto> {
    if (!file) throw new BadRequestException('Image file is not found');
    about.imagePath = file.path;
    return this.aboutService.create(about);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: uploadImageConfig(),
      // fileFilter,
    }),
  )
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) about: AboutFormDto,
    @UploadedFile() file,
  ): Promise<AboutDto> {
    console.log(file);
    const image = file ? file.path : about.imagePath;
    console.log(image);
    return this.aboutService.update({ ...about, imagePath: image }, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    await this.aboutService.delete(id);
    return 'Successfully deleted';
  }
}
