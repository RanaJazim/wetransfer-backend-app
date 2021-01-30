import { EntityRepository, Repository } from 'typeorm';

import { EventRegister } from './event-register.entity';

@EntityRepository(EventRegister)
export class EventRegisterRepository extends Repository<EventRegister> {}
