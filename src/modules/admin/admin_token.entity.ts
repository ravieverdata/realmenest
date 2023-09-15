import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin_token')
export class AdminTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    token: string;

    @Column({ type: 'int', nullable: true })
    unid: number;

    @Column({ type: 'varchar', nullable: true })
    userid: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    created_at: Date;

  // Other columns...
}
