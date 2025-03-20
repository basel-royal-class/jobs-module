import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CountryEntity } from './countries.entity';

@Entity('cities')
export class CityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'country_id' })
    countryId: number;

    @ManyToOne(() => CountryEntity, country => country.cities)
    @JoinColumn({ name: 'country_id' })
    country: CountryEntity;
}
