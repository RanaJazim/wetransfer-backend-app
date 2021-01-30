import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventRegisterRepository } from './event-register.repository';

@Injectable()
export class EventRegisterService {
  constructor(
    @InjectRepository(EventRegisterRepository)
    private eventRegRepository: EventRegisterRepository,
  ) {}
}
