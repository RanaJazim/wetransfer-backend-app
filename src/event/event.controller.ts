import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { EventDto, EventFormDto } from "./dtos";
import { EventService } from "./event.service";
import { uploadImageConfig } from "src/utils/img_upload";

@Controller("event")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  async fetchAllEvents(): Promise<EventDto[]> {
    return this.eventService.fetchAllEvents();
  }

  @Get(":id")
  async fetchSingleEvent(@Param("id") id: number): Promise<EventDto> {
    return this.eventService.fetchSingleEvent(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor("image", { storage: uploadImageConfig() }))
  async createEvent(
    @UploadedFile() file,
    @Body(ValidationPipe) event: EventFormDto
  ): Promise<EventDto> {
    if (!file)
      throw new BadRequestException(
        "Please upload image. Image file is not found .."
      );
    return this.eventService.createEvent({ ...event, imagePath: file.path });
  }

  @Patch(":id")
  async updateEvent(
    @Body(ValidationPipe) event: EventFormDto,
    @Param("id") id: number
  ): Promise<EventDto> {
    return this.eventService.updateEvent(event, id);
  }

  @Delete(":id")
  async deleteEvent(@Param("id") id: number): Promise<string> {
    await this.eventService.deleteEvent(id);
    return `Event ${id} is successfully deleted`;
  }
}
