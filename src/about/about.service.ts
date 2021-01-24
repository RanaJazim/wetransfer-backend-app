import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from './about.entity';
import { AboutRepository } from './about.repository';
import { AboutDto, AboutFormDto } from './dtos';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutRepository)
    private aboutRepository: AboutRepository,
  ) {}

  async get(): Promise<AboutDto> {
    return this.aboutRepository.findOne();
  }

  async create(about: AboutFormDto): Promise<AboutDto> {
    return this.aboutRepository.createRecord(about);
  }

  async update(about: AboutFormDto, id: number): Promise<AboutDto> {
    const recordInDB = await this.getByIdOrFail(id);

    const { title, description } = about;

    recordInDB.title = title;
    recordInDB.description = description;
    return await recordInDB.save();
  }

  async delete(id: number): Promise<void> {
    const result = await this.aboutRepository.delete(id);

    if (result.affected == 0)
      throw new NotFoundException(`Record with ${id} not found`);
  }

  private async getByIdOrFail(id: number): Promise<About> {
    const recordInDB = await this.aboutRepository.findOne(id);

    if (!recordInDB) throw new NotFoundException(`Record with ${id} not found`);

    return recordInDB;
  }
}
