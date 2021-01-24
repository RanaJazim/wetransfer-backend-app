import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutRepository } from './about.repository';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutRepository)
    private aboutRepository: AboutRepository,
  ) {}
}
