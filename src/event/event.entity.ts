import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
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
}
