import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceService } from '../../services/references.service';
import { ReferenceRepository } from '../../repositories/references.repository';
import { ReferenceEntity } from '../../entities/references.entity';
import { CreateReferenceDto } from '../../dtos/references.dto';
import { NotFoundException } from '@nestjs/common';
import { UserJobProfile } from 'src/core/entities/user-job-profile.entity';

describe('ReferenceService', () => {
  let service: ReferenceService;
  let repository: ReferenceRepository;

  const mockReferenceRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    createReference: jest.fn(),
    deleteReference: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferenceService,
        {
          provide: ReferenceRepository,
          useValue: mockReferenceRepository,
        },
      ],
    }).compile();

    service = module.get<ReferenceService>(ReferenceService);
    repository = module.get<ReferenceRepository>(ReferenceRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all references', async () => {
      const mockUserJobProfile = { id: 1 } as UserJobProfile;
      
      const references = [
        {
          id: 1,
          user_id: 1,
          name: 'John Doe',
          company_name: 'ABC Corp',
          email: 'john@example.com',
          created_at: new Date(),
          updated_at: new Date(),
          userJobProfile: mockUserJobProfile,
        } as ReferenceEntity,
      ];

      mockReferenceRepository.findAll.mockResolvedValue(references);

      const result = await service.findAll();

      expect(result).toEqual(references);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should propagate exceptions from repository', async () => {
      const error = new Error('Database error');
      mockReferenceRepository.findAll.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(Error);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a reference by ID', async () => {
      const mockUserJobProfile = { id: 1 } as UserJobProfile;
      
      const reference = {
        id: 1,
        user_id: 1,
        name: 'John Doe',
        company_name: 'ABC Corp',
        email: 'john@example.com',
        created_at: new Date(),
        updated_at: new Date(),
        userJobProfile: mockUserJobProfile,
      } as ReferenceEntity;

      mockReferenceRepository.findById.mockResolvedValue(reference);

      const result = await service.findById(1);

      expect(result).toEqual(reference);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should propagate NotFoundException from repository', async () => {
      const error = new NotFoundException('Reference with ID 999 not found');
      mockReferenceRepository.findById.mockRejectedValue(error);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    const createDto: CreateReferenceDto = {
      user_id: 1,
      name: 'John Doe',
      company_name: 'ABC Corp',
      email: 'john@example.com',
    };

    it('should create and return a reference', async () => {
      const mockUserJobProfile = { id: 1 } as UserJobProfile;
      
      const reference = {
        id: 1,
        user_id: 1,
        name: 'John Doe',
        company_name: 'ABC Corp',
        email: 'john@example.com',
        created_at: new Date(),
        updated_at: new Date(),
        userJobProfile: mockUserJobProfile,
      } as ReferenceEntity;

      mockReferenceRepository.createReference.mockResolvedValue(reference);

      const result = await service.create(createDto);

      expect(result).toEqual(reference);
      expect(repository.createReference).toHaveBeenCalledWith(createDto);
    });

    it('should propagate exceptions from repository', async () => {
      const error = new NotFoundException('User job profile not found');
      mockReferenceRepository.createReference.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
      expect(repository.createReference).toHaveBeenCalledWith(createDto);
    });
  });

  describe('delete', () => {
    it('should delete a reference successfully', async () => {
      mockReferenceRepository.deleteReference.mockResolvedValue(undefined);

      await service.delete(1);

      expect(repository.deleteReference).toHaveBeenCalledWith(1);
    });

    it('should propagate exceptions from repository', async () => {
      const error = new NotFoundException('Reference with ID 999 not found');
      mockReferenceRepository.deleteReference.mockRejectedValue(error);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
      expect(repository.deleteReference).toHaveBeenCalledWith(999);
    });
  });
});