import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegisterDto, EventRegisterFormDto } from './dtos';

import { EventRegisterRepository } from './event-register.repository';

@Injectable()
export class EventRegisterService {
  constructor(
    @InjectRepository(EventRegisterRepository)
    private eventRegRepository: EventRegisterRepository,
  ) {}

  getRegisteredEvents(id: number): Promise<EventRegisterDto[]> {
    return this.eventRegRepository.find({ eventId: +id });
  }

  createRegistrationForEvent(
    regEvent: EventRegisterFormDto,
  ): Promise<EventRegisterDto> {
    return this.eventRegRepository.createEventRegister(regEvent);
  }
}
