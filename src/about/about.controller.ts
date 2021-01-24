import { Controller, Get, Post } from '@nestjs/common';

import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  async about() {
    return 'About detail';
  }

  @Post()
  async create() {
    return 'create about detail';
  }
}
