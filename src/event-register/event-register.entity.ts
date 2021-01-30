import { Event } from 'src/event/event.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EventRegister extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column()
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column({ length: 15 })
  phone: string;

  @Column()
  address: string;

  @Column()
  door: string;

  @Column()
  floor: string;

  @Column()
  zipCode: string;

  @Column()
  nif: string;

  @Column()
  teamName: string;

  @Column()
  category: string;

  @Column()
  selectedEvent: string;

  @Column({ type: 'tinyint' })
  companions: number;

  @Column()
  issue: string;

  @Column()
  eventId: number;
  @ManyToOne(() => Event, (event) => event.registerEvents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId' })
  event: Event;
}
