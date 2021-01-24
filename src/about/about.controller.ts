import { Controller, Get } from '@nestjs/common';

import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Get()
  async about() {
    return 'About detail';
  }
}
