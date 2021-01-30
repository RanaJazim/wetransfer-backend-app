import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class EventRegisterFormDto {
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

export class EventRegisterDto {
  id: number;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  door: string;
  floor: string;
  zipCode: string;
  nif: string;
  teamName: string;
  category: string;
  selectedEvent: string;
  companions: number;
  issue: string;
  eventId: number;
}
