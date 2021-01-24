import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { AboutService } from './about.service';
import { AboutDto, AboutFormDto } from './dtos';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  async about(): Promise<AboutDto> {
    return this.aboutService.get();
  }

  @Post()
  async create(@Body(ValidationPipe) about: AboutFormDto): Promise<AboutDto> {
    return this.aboutService.create(about);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) about: AboutFormDto,
  ): Promise<AboutDto> {
    return this.aboutService.update(about, id);
  }
}
