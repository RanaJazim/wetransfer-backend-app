import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}
}
