import { IsNotEmpty, IsNumber, Length, Min } from "class-validator";

export class EventFormDto {
  @IsNotEmpty()
  @Length(5, 200)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  applyDate: string;

  @IsNotEmpty()
  applyTime: string;

  @IsNotEmpty()
  eventDate: string;

  @IsNotEmpty()
  eventTime: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  shortenRoutes: string;

  @IsNotEmpty()
  priceToApply: number;

  @IsNotEmpty()
  federatedPrice: number;

  @IsNotEmpty()
  mealPrice: number;

  imagePath: string;
}

export class EventDto {
  id: number;
  title: string;
  description: string;
  applyDate: string;
  applyTime: string;
  eventDate: string;
  eventTime: string;
  location: string;
  shortenRoutes: string;
  priceToApply: number;
  federatedPrice: number;
  mealPrice: number;
  imagePath: string;
}
