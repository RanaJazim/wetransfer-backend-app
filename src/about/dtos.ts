import { IsNotEmpty, Length } from 'class-validator';

export class AboutFormDto {
  @IsNotEmpty()
  @Length(5, 50)
  title: string;

  @IsNotEmpty()
  description: string;

  imagePath: string;
}

export class AboutDto {
  id: number;
  title: string;
  description: string;
}
