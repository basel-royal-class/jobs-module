import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { UserJobProfile } from '../../../core/entities/user-job-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserJobRepository {
  constructor(
    @InjectRepository(UserJobProfile)
    private readonly repository: Repository<UserJobProfile>,
  ) {}

  async findById(profileId: number): Promise<UserJobProfile | null> {
    return this.repository.findOne({
      where: { id: profileId },
      relations: ['user', 'experiences' , 'experiences.company' , 'experiences.industry'  , 'experiences.job_category', 'languages', 'visa', 'country', 'city'],
    });
  }

  async findByUserId(userId: number): Promise<UserJobProfile | null> {
    return this.repository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'experiences', 'languages', 'visa', 'country', 'city'],
    });
  }

  async saveProfile(profile: UserJobProfile): Promise<UserJobProfile> {
    return this.repository.save(profile);
  }
}
