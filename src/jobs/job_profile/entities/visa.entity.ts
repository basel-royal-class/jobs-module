import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('visa_type')
export class VisaTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
