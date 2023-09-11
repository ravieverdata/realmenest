import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('dashboardtickets')
export class DashboardTicketsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  nm: string;

  @Column({ type: 'int', nullable: true })
  tody: number;

  @Column({ type: 'int', nullable: true })
  yesterdy: number;

  @Column({ type: 'double', nullable: true })
  todaycash: number;

  @Column({ type: 'int', nullable: true })
  mnth: number;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedon: Timestamp;

  @Column({ type: 'int', nullable: true })
  one: number;

  @Column({ type: 'int', nullable: true })
  two: number;

  @Column({ type: 'int', nullable: true })
  three: number;

  @Column({ type: 'int', nullable: true })
  four: number;

  @Column({ type: 'int', nullable: true })
  five: number;
  
}

