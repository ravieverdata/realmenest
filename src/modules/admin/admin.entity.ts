import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('admin')
export class AdminEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, nullable: true })
  un: string;

  @Column({ length: 500, nullable: true })
  ps: string;

  @Column({ length: 10, nullable: false })
  ph: string;

  @Column({ length: 500, nullable: false })
  email: string;

  @Column({ length: 500, nullable: false })
  email2: string;

  @Column({ length: 10, nullable: true })
  st: string;

  @Column({ type: 'int', nullable: true })
  clid: number;

  @Column({ length: 500, nullable: false })
  permissions: string;

  @Column({ length: 50, nullable: false })
  tp: string;

  @Column({ length: 25, nullable: false })
  ticketcheck: string;

  // @Column({ enum: ['true', 'false'], default: 'false', nullable: false })
  // whatsappcheck: string;

  @Column({ length: 255, nullable: false })
  acmanagername: string;

  @Column({ length: 10, nullable: false })
  dedicatednumber: string;

  @Column({ length: 10, nullable: false })
  callbackalert: string;

  @Column({ length: 10, nullable: false })
  calltomobile: string;

  @Column({ length: 10, nullable: false })
  calltoclid: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  calltype: number;

  @Column({ length: 10, nullable: false })
  loginstatus: string;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  lastactivity: Timestamp;

  @Column({ length: 25, nullable: false })
  techteam: string;

}

