import { Test, TestingModule } from '@nestjs/testing';
import { CertificationController } from '../../controllers/certification.controller';
import { CertificationService } from '../../services/certification.service';
import { CreateCertificationDto } from '../../dtos/certification.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CertificationController', () => {
  let controller: CertificationController;
  let service: CertificationService;

  const mockCertificationService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificationController],
      providers: [
        {
          provide: CertificationService,
          useValue: mockCertificationService,
        },
      ],
    }).compile();

    controller = module.get<CertificationController>(CertificationController);
    service = module.get<CertificationService>(CertificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createCertificationDto: CreateCertificationDto = {
      user_id: 1,
      course_name: 'AWS Certified Solutions Architect',
      issuing_organization: 'AWS',
    };

    const certificationEntity = {
      id: 1,
      user_id: 1,
      course_name: 'AWS Certified Solutions Architect',
      issuing_organization: 'AWS',
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create a certification successfully', async () => {
      mockCertificationService.create.mockResolvedValue(certificationEntity);

      const result = await controller.create(createCertificationDto);

      expect(result).toEqual({
        success: true,
        data: certificationEntity,
      });
      expect(service.create).toHaveBeenCalledWith(createCertificationDto);
    });

    it('should throw BadRequestException when service throws BadRequestException', async () => {
      const errorMessage = 'A certification with this name already exists';
      mockCertificationService.create.mockRejectedValue(new BadRequestException(errorMessage));

      await expect(controller.create(createCertificationDto)).rejects.toThrow(BadRequestException);
      expect(service.create).toHaveBeenCalledWith(createCertificationDto);
    });

    it('should throw InternalServerErrorException when service throws an unknown error', async () => {
      mockCertificationService.create.mockRejectedValue(new Error('Unknown error'));

      await expect(controller.create(createCertificationDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(service.create).toHaveBeenCalledWith(createCertificationDto);
    });
  });

  describe('findAll', () => {
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

    it('should return all certifications successfully', async () => {
      mockCertificationService.findAll.mockResolvedValue(certifications);

      const result = await controller.findAll();

      expect(result).toEqual({
        success: true,
        data: certifications,
      });
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when service throws an error', async () => {
      mockCertificationService.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(service.findAll).toHaveBeenCalled();
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

    it('should return a certification by ID successfully', async () => {
      mockCertificationService.findById.mockResolvedValue(certification);

      const result = await controller.findById(1);

      expect(result).toEqual({
        success: true,
        data: certification,
      });
      expect(service.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when service throws NotFoundException', async () => {
      mockCertificationService.findById.mockRejectedValue(
        new NotFoundException('Certification with ID 999 not found'),
      );

      await expect(controller.findById(999)).rejects.toThrow(NotFoundException);
      expect(service.findById).toHaveBeenCalledWith(999);
    });

    it('should throw InternalServerErrorException when service throws an unknown error', async () => {
      mockCertificationService.findById.mockRejectedValue(new Error('Database error'));

      await expect(controller.findById(1)).rejects.toThrow(InternalServerErrorException);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete a certification successfully', async () => {
      mockCertificationService.delete.mockResolvedValue(undefined);

      const result = await controller.delete(1);

      expect(result).toEqual({
        success: true,
        message: 'Certification deleted successfully',
      });
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when service throws NotFoundException', async () => {
      mockCertificationService.delete.mockRejectedValue(
        new NotFoundException('Certification with ID 999 not found'),
      );

      await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
      expect(service.delete).toHaveBeenCalledWith(999);
    });

    it('should throw InternalServerErrorException when service throws an unknown error', async () => {
      mockCertificationService.delete.mockRejectedValue(new Error('Database error'));

      await expect(controller.delete(1)).rejects.toThrow(InternalServerErrorException);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});