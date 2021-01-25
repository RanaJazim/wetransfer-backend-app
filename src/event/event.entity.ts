import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EventFormDto } from './dtos';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  applyDate: string;

  @Column()
  applyTime: string;

  @Column()
  eventDate: string;

  @Column()
  eventTime: string;

  @Column()
  location: string;

  @Column()
  shortenRoutes: string;

  @Column('int')
  priceToApply: number;

  @Column('int')
  federatedPrice: number;

  @Column('int')
  mealPrice: number;

  copy(event: EventFormDto): void {
    this.title = event.title;
    this.description = event.description;
    this.applyDate = event.applyDate;
    this.applyTime = event.applyTime;
    this.eventDate = event.eventDate;
    this.eventTime = event.eventTime;
    this.location = event.location;
    this.shortenRoutes = event.shortenRoutes;
    this.priceToApply = event.priceToApply;
    this.federatedPrice = event.federatedPrice;
    this.mealPrice = event.mealPrice;
  }
}