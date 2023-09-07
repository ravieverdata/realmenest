import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('adminloginhistory')
export class AdminLoginHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unid: number;

  @Column({ length: 50, nullable: true })
  userid: string;

  @Column({ length: 200, nullable: true })
  ip: string;

  @CreateDateColumn()
  dt: Timestamp;

  @Column({ length: 10, nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  sessionstatus: string;

  // @Column()
  // logoutdt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'logoutdt'
})
  logoutdt: Date;

  @Column()
  otp: string;
}
