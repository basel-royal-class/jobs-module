import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('nationalities')
export class Nationality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}