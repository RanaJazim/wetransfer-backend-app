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

  async registrationSummary() {
    const registration = await this.query(`
      SELECT Case 
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) < 25 then '<25'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 25 and 35 then '25-35'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 36 and 50 then '36-50'
      else '>50' END AS age_group, 
      sum(if(gender='male', 1, 0)) as male, 
      sum(if(gender='female', 1, 0)) as female, 
      COUNT(1) as total FROM event_register 
      WHERE eventId = (
        SELECT id
        FROM event
        WHERE yearweek(DATE(eventDate), 1) = yearweek(curdate(), 1)
        LIMIT 1
      )
      GROUP BY Case 
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) < 25 then '<25'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 25 and 35 then '25-35'
      when TIMESTAMPDIFF(YEAR, dateOfBirth, NOW()) between 36 and 50 then '36-50'
      else '>50' END;
    `);

    return registration;
  }
}
