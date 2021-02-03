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

  getRegistrationsForCurrentEvent() {
    return this.eventRegRepository.allRegistrationForCurrentEvent();
  }

  async createRegistrationForEvent(
    regEvent: EventRegisterFormDto,
  ): Promise<EventRegSummary> {
    const event = await this.eventRegRepository.createEventRegister(regEvent);
    return this.getOrderSummary(event);
  }

  async currentEventRegistrationSummary() {
    const registrations = await this.eventRegRepository.registrationSummary();
    return this.registrationSummary(registrations);
  }

  async updateStatus(id: number) {
    const regEvent = await this.eventRegRepository.findOne(id);

    regEvent.isPending = !regEvent.isPending;
    regEvent.save();
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
      eventImage: event.imagePath,
    };
  }

  private async registrationSummary(records: any[]) {
    let ageKeys = [];
    let ageSummary = [];
    let male = 0;
    let female = 0;
    let totalPrice = 0;
    let total = 0;

    const events = await this.eventRepository.getCurrentEvent();
    const event = events ? events[0] : {};


    let eventMealPrice = event.mealPrice ?? 0;
    let eventFederatedPrice = event.federatedPrice ?? 0;
    let eventPriceToApply = event.priceToApply ?? 0;


    for (const rec of records) {
      const obj = { [rec.age_group]: +rec.total };
      ageSummary.push(obj);
      ageKeys.push(rec.age_group);

      if (!rec.isPending) {

        const selectedEvent = rec.selectedEvent.toLowerCase().split(/[\s,]+/);
        const isMealfound = selectedEvent.includes('meal');
        const isFederatedFound = selectedEvent.includes('federated');

        totalPrice += eventPriceToApply;
        totalPrice += isMealfound ? eventMealPrice : 0;
        totalPrice += isFederatedFound ? eventFederatedPrice : 0;
      }

      male += +rec.male;
      female += +rec.female;
      total += +rec.total;
    }

    if (!ageKeys.includes('<25')) ageSummary.push({ '<25': 0 });
    if (!ageKeys.includes('25-35')) ageSummary.push({ '25-35': 0 });
    if (!ageKeys.includes('36-50')) ageSummary.push({ '36-50': 0 });
    if (!ageKeys.includes('>50')) ageSummary.push({ '>50': 0 });

    return { ageSummary, male, female, total, totalPrice };
  }
}
