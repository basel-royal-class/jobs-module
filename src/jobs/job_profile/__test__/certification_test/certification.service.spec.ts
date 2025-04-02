import { Test, TestingModule } from '@nestjs/testing';
import { CertificationService } from '../../services/certification.service';
import { CertificationRepository } from '../../repositories/certifications.repository';
import { CertificationEntity } from '../../entities/certification.entity';
import { CreateCertificationDto } from '../../dtos/certification.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CertificationService', () => {
  let service: CertificationService;
  let repository: CertificationRepository;

  const mockCertificationRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findOneBy: jest.fn(),
    createCertification: jest.fn(),
    deleteCertification: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificationService,
        {
          provide: CertificationRepository,
          useValue: mockCertificationRepository,
        },
      ],
    }).compile();

    service = module.get<CertificationService>(CertificationService);
    repository = module.get<CertificationRepository>(CertificationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all certifications', async () => {
      const certifications = [
        {
          id: 1,
          user_id: 1,
          course_name: 'AWS Certified Solutions Architect',
          issuing_organization: 'AWS',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockCertificationRepository.findAll.mockResolvedValue(certifications);

      const result = await service.findAll();

      expect(result).toEqual(certifications);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should rethrow exceptions from repository', async () => {
      const error = new InternalServerErrorException('Database error');
      mockCertificationRepository.findAll.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    const certification = {
      id: 1,
      user_id: 1,
      course_name: 'AWS Certified Solutions Architect',
      issuing_organization: 'AWS',
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should return a certification by ID', async () => {
      mockCertificationRepository.findById.mockResolvedValue(certification);

      const result = await service.findById(1);

      expect(result).toEqual(certification);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it('should rethrow NotFoundException from repository', async () => {
      const error = new NotFoundException('Certification with ID 999 not found');
      mockCertificationRepository.findById.mockRejectedValue(error);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith(999);
    });

    it('should rethrow other exceptions from repository', async () => {
      const error = new InternalServerErrorException('Database error');
      mockCertificationRepository.findById.mockRejectedValue(error);

      await expect(service.findById(1)).rejects.toThrow(InternalServerErrorException);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    const createDto: CreateCertificationDto = {
      user_id: 1,
      course_name: 'AWS Certified Solutions Architect',
      issuing_organization: 'AWS',
    };

    const certification = {
      id: 1,
      user_id: 1,
      course_name: 'AWS Certified Solutions Architect',
      issuing_organization: 'AWS',
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create and return a certification when no duplicate exists', async () => {
      mockCertificationRepository.findOneBy.mockResolvedValue(null);
      mockCertificationRepository.createCertification.mockResolvedValue(certification);

      const result = await service.create(createDto);

      expect(result).toEqual(certification);
      expect(repository.findOneBy).toHaveBeenCalledWith({
        course_name: createDto.course_name,
      });
      expect(repository.createCertification).toHaveBeenCalledWith(createDto);
    });

    it('should throw BadRequestException if certification with same name exists', async () => {
      mockCertificationRepository.findOneBy.mockResolvedValue({
        id: 2,
        course_name: createDto.course_name,
      } as CertificationEntity);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(repository.findOneBy).toHaveBeenCalledWith({
        course_name: createDto.course_name,
      });
      expect(repository.createCertification).not.toHaveBeenCalled();
    });

    it('should handle unique constraint violation error (code 23505)', async () => {
      mockCertificationRepository.findOneBy.mockResolvedValue(null);

      const dbError = new Error('Duplicate key violation');
      dbError['code'] = '23505';
      mockCertificationRepository.createCertification.mockRejectedValue(dbError);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(repository.findOneBy).toHaveBeenCalled();
      expect(repository.createCertification).toHaveBeenCalled();
    });

    it('should rethrow BadRequestException from repository', async () => {
      mockCertificationRepository.findOneBy.mockResolvedValue(null);
      
      const error = new BadRequestException('Invalid data');
      mockCertificationRepository.createCertification.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(repository.findOneBy).toHaveBeenCalled();
      expect(repository.createCertification).toHaveBeenCalled();
    });

    it('should rethrow NotFoundException from repository', async () => {
      mockCertificationRepository.findOneBy.mockResolvedValue(null);
      
      const error = new NotFoundException('Entity not found');
      mockCertificationRepository.createCertification.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalled();
      expect(repository.createCertification).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      mockCertificationRepository.findOneBy.mockResolvedValue(null);
      mockCertificationRepository.createCertification.mockRejectedValue(new Error('Unknown error'));

      await expect(service.create(createDto)).rejects.toThrow(InternalServerErrorException);
      expect(repository.findOneBy).toHaveBeenCalled();
      expect(repository.createCertification).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a certification successfully', async () => {
      mockCertificationRepository.deleteCertification.mockResolvedValue(undefined);

      await service.delete(1);

      expect(repository.deleteCertification).toHaveBeenCalledWith(1);
    });

    it('should rethrow exceptions from repository', async () => {
      const error = new NotFoundException('Certification with ID 999 not found');
      mockCertificationRepository.deleteCertification.mockRejectedValue(error);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
      expect(repository.deleteCertification).toHaveBeenCalledWith(999);
    });
  });
});