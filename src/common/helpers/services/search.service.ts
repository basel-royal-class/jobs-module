// degree.service.ts
import { Injectable } from '@nestjs/common';
import { SearchRepository } from '../repositories/search.repository';
import { DegreesEntity } from "../../../core/entities/degrees.entity";;
import { SchoolsEntity } from "../../../core/entities/schools.entity";;

@Injectable()
export class SearchService {
    constructor(
        private readonly respository: SearchRepository,
    ) { }

    async degreesSearch(query: string): Promise<DegreesEntity[]> {
        return await this.respository.degreesSearch(query);
    }

    async schoolsSearch(query: string): Promise<SchoolsEntity[]> {
        return await this.respository.schoolsSearch(query);
    }

    // async companiesSearch(query: string): Promise<CompanyEntity[]> {
    //     return await this.respository.companiesSearch(query);
    // }
}
