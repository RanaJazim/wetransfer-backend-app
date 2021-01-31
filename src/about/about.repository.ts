import { EntityRepository, Repository } from 'typeorm';

import { About } from './about.entity';
import { AboutDto, AboutFormDto } from './dtos';

@EntityRepository(About)
export class AboutRepository extends Repository<About> {
  async createRecord(about: AboutFormDto): Promise<AboutDto> {
    const { title, description, image: imagePath } = about;
    const aboutRecord = new About();

    aboutRecord.title = title;
    aboutRecord.description = description;
    aboutRecord.image = imagePath;
    return await aboutRecord.save();
  }
}
