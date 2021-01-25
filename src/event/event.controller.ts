import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { EventDto, EventFormDto } from './dtos';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async fetchAllEvents(): Promise<EventDto[]> {
    return this.eventService.fetchAllEvents();
  }

  @Get(':id')
  async fetchSingleEvent(@Param('id') id: number): Promise<EventDto> {
    return this.eventService.fetchSingleEvent(id);
  }

  @Post()
  async createEvent(
    @Body(ValidationPipe) event: EventFormDto,
  ): Promise<EventDto> {
    return this.eventService.createEvent(event);
  }

  @Patch(':id')
  async updateEvent(
    @Body(ValidationPipe) event: EventFormDto,
    @Param('id') id: number,
  ): Promise<EventDto> {
    return this.eventService.updateEvent(event, id);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number): Promise<string> {
    await this.eventService.deleteEvent(id);
    return `Event ${id} is successfully deleted`;
  }
}
