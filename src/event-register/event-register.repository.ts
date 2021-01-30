import { EntityRepository, Repository } from 'typeorm';

import { EventRegister } from './event-register.entity';
import { EventRegisterDto, EventRegisterFormDto } from './dtos';

@EntityRepository(EventRegister)
export class EventRegisterRepository extends Repository<EventRegister> {
  async createEventRegister(
    regEvent: EventRegisterFormDto,
  ): Promise<EventRegisterDto> {
    const register = new EventRegister();
    register.copy(regEvent);

    return await register.save();
  }
}
