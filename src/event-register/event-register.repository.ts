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

  async allRegistrationForCurrentEvent() {
    const registrations = await this.query(`
      SELECT *
      FROM event_register 
      WHERE eventId = (
        SELECT id
        FROM event
        WHERE yearweek(DATE(eventDate), 1) = yearweek(curdate(), 1)
        LIMIT 1
      )
    `);

    return registrations;
  }
}
