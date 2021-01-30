import { Controller } from '@nestjs/common';

import { EventRegisterService } from './event-register.service';

@Controller('event-register')
export class EventRegisterController {
  constructor(private eventRegService: EventRegisterService) {}
}
