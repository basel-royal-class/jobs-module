import { Injectable } from '@nestjs/common';
import { VisaResponseDto } from '../dtos/visa.dto';
import { VisaTypeRepository } from '../repositories/visa.repository';

@Injectable()
export class VisaTypeService {
  constructor(private readonly visaTypeRepository: VisaTypeRepository) {}

  async findAll(): Promise<VisaResponseDto> {
    const visaTypes = await this.visaTypeRepository.findAllVisaTypes();

    return {
      success: true,
      data: visaTypes.map((visaType) => ({
        id: visaType.id,
        value: visaType.value,
      })),
    };
  }
}
