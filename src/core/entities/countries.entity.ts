import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { CityEntity } from './cities.entity';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'country_code' })
  countryCode: string;

  @Column({ name: 'currency_code' })
  currencyCode: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @OneToMany(() => CityEntity, city => city.country)
  cities: CityEntity[];
}