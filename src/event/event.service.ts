import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventDto, EventFormDto } from './dtos';
import { Event } from './event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  fetchAllEvents(): Promise<EventDto[]> {
    return this.eventRepository.find();
  }

  currentEvent() {
    return this.eventRepository.getCurrentEvent();
  }

  fetchFutureEvents(): Promise<EventDto[]> {
    return this.eventRepository.futureEvents();
  }

  pastEvents(): Promise<EventDto[]> {
    return this.eventRepository.pastEvents();
  }

  async fetchSingleEvent(id: number): Promise<Event> {
    const eventInDb = await this.eventRepository.findOne(id);
    if (!eventInDb) this.throwNotFoundException(id);
    return eventInDb;
  }

  createEvent(event: EventFormDto): Promise<EventDto> {
    return this.eventRepository.createEvent(event);
  }

  async updateEvent(event: EventFormDto, id: number): Promise<EventDto> {
    const eventInDb = await this.fetchSingleEvent(id);
    eventInDb.copy(event);

    return await eventInDb.save();
  }

  async deleteEvent(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);

    if (result.affected == 0) this.throwNotFoundException(id);
  }

  private throwNotFoundException(id: number) {
    throw new NotFoundException(`Event with ${id} not found`);
  }
}
