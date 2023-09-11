import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity('dashboard')
export class DashboardEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  pactivation: number;

  @Column({ type: 'int', nullable: true })
  tickets: number;

  @Column({ type: 'int', nullable: true })
  odrs: number;

  @Column({ type: 'double', nullable: true })
  todaycash: number;

  @Column({ type: 'double', nullable: true })
  currentmonthcash: number;

  @Column({ type: 'double', nullable: true })
  lastmonthcash: number;

  @Column({ type: 'int', nullable: true })
  psuspend: number;

  @Column({ type: 'double', nullable: true })
  domainfunds: number;

  @Column({ type: 'double', nullable: true })
  ratings: number;

  @Column({ type: 'int', nullable: true })
  linuxmissbackup: number;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updatedon: Timestamp;

}

