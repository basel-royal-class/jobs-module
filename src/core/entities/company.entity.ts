import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { CityEntity } from './cities.entity';

@Entity('companies')
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
