import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from 'src/event/event.repository';
import {
  EventRegisterDto,
  EventRegisterFormDto,
  EventRegSummary,
} from './dtos';

import { EventRegisterRepository } from './event-register.repository';

@Injectable()
export class EventRegisterService {
  constructor(
    @InjectRepository(EventRegisterRepository)
    private eventRegRepository: EventRegisterRepository,
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  getRegisteredEvents(id: number): Promise<EventRegisterDto[]> {
    return this.eventRegRepository.find({ eventId: +id });
  }

  async createRegistrationForEvent(
    regEvent: EventRegisterFormDto,
  ): Promise<EventRegSummary> {
    const event = await this.eventRegRepository.createEventRegister(regEvent);
    return this.getOrderSummary(event);
  }

  private async getOrderSummary(
    regEvent: EventRegisterDto,
  ): Promise<EventRegSummary> {
    const event = await this.eventRepository.findOne(regEvent.eventId);

    const selectedEvent = regEvent.selectedEvent.toLowerCase().split(/[\s,]+/);
    const isMealfound = selectedEvent.includes('meal');
    const isFederatedFound = selectedEvent.includes('federated');

    const { mealPrice, federatedPrice, priceToApply } = event;

    const _meal = isMealfound ? mealPrice : 0;
    const _federeated = isFederatedFound ? federatedPrice : 0;
    const _totalPrice = _meal + _federeated + priceToApply;

    return {
      mealPrice: _meal,
      federatedPrice: _federeated,
      eventRegPrice: priceToApply,
      totalPrice: _totalPrice,
    };
  }
}
