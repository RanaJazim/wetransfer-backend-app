import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class EventRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  door: string;

  @IsNotEmpty()
  floor: string;

  @IsNotEmpty()
  zipCode: string;

  @IsNotEmpty()
  nif: string;

  @IsNotEmpty()
  teamName: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  selectedEvent: string;

  @IsNotEmpty()
  companions: number;

  @IsNotEmpty()
  issue: string;

  @IsNotEmpty()
  eventId: number;
}
