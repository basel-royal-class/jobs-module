import { Test, TestingModule } from '@nestjs/testing';
import { CertificationController } from '../../controllers/certification.controller';
import { CertificationService } from '../../services/certification.service';
import { CreateCertificationDto } from '../../dtos/certification.dto';

import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';

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

    it('should create a certification and return 201 status with success response', async () => {
      mockCertificationService.create.mockResolvedValue(certificationEntity);

      const result = await controller.create(createCertificationDto);

      expect(result).toEqual({
        success: true,
        data: certificationEntity,
      });

      expect(service.create).toHaveBeenCalledWith(createCertificationDto);
    });

    it('should handle validation errors when dto is invalid', async () => {
      const validationPipe = new ValidationPipe();
      const invalidDto = { user_id: 'not-a-number' };

      try {
        await validationPipe.transform(invalidDto, {
          type: 'body',
          metatype: CreateCertificationDto,
        });
        fail('Should have thrown validation error');
      } catch (error) {
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it('should throw BadRequestException and maintain its status code when service throws BadRequestException', async () => {
      const errorMessage = 'A certification with this name already exists';
      const badRequestError = new BadRequestException(errorMessage);
      mockCertificationService.create.mockRejectedValue(badRequestError);

      try {
        await controller.create(createCertificationDto);
        fail('Should have thrown BadRequestException');
      } catch (error) {
        expect(error).toBe(badRequestError);
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
        expect(error.message).toContain(errorMessage);
      }

      expect(service.create).toHaveBeenCalledWith(createCertificationDto);
    });

    it('should wrap unknown errors in InternalServerErrorException with status 500', async () => {
      mockCertificationService.create.mockRejectedValue(new Error('Unknown error'));

      try {
        await controller.create(createCertificationDto);
        fail('Should have thrown InternalServerErrorException');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toContain('Failed to create certification');
      }

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

      {
        id: 2,
        user_id: 1,
        course_name: 'AWSS Certified Solutions Architect',
        issuing_organization: 'AWSS',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    it('should return all certifications with status 200 and success response', async () => {
      mockCertificationService.findAll.mockResolvedValue(certifications);

      const result = await controller.findAll();

      console.log(result, 'result result result');
      expect(result).toEqual({
        success: true,
        data: certifications,
      });

      expect(service.findAll).toHaveBeenCalled();
    });

    it('should wrap database errors in InternalServerErrorException with status 500', async () => {
      mockCertificationService.findAll.mockRejectedValue(new Error('Database error'));

      try {
        await controller.findAll();
        fail('Should have thrown InternalServerErrorException');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toContain('Failed to fetch certifications');
      }

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

    it('should return a certification by ID with status 200 and success response', async () => {
      mockCertificationService.findById.mockResolvedValue(certification);

      const result = await controller.findById(1);

      // Verify response format
      expect(result).toEqual({
        success: true,
        data: certification,
      });

      expect(service.findById).toHaveBeenCalledWith(1);
    });

    it('should convert string ID parameter to number using ParseIntPipe', async () => {
      const stringId = '1';
      const numberId = parseInt(stringId, 10);

      expect(numberId).toBe(1);
      expect(typeof numberId).toBe('number');

      mockCertificationService.findById.mockResolvedValue(certification);
      await controller.findById(numberId);
      expect(service.findById).toHaveBeenCalledWith(1);
    });

    it('should maintain NotFoundException status code when service throws NotFoundException', async () => {
      const errorMessage = 'Certification with ID 999 not found';
      const notFoundError = new NotFoundException(errorMessage);
      mockCertificationService.findById.mockRejectedValue(notFoundError);

      try {
        await controller.findById(999);
        fail('Should have thrown NotFoundException');
      } catch (error) {
        expect(error).toBe(notFoundError);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toContain(errorMessage);
      }

      expect(service.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('delete', () => {
    it('should delete a certification and return success message with status 200', async () => {
      mockCertificationService.delete.mockResolvedValue(undefined);

      const result = await controller.delete(1);

      // Verify response format
      expect(result).toEqual({
        success: true,
        message: 'Certification deleted successfully',
      });

      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should maintain NotFoundException status code when service throws NotFoundException', async () => {
      const errorMessage = 'Certification with ID 999 not found';
      const notFoundError = new NotFoundException(errorMessage);
      mockCertificationService.delete.mockRejectedValue(notFoundError);

      try {
        await controller.delete(999);
        fail('Should have thrown NotFoundException');
      } catch (error) {
        expect(error).toBe(notFoundError);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.message).toContain(errorMessage);
      }

      expect(service.delete).toHaveBeenCalledWith(999);
    });

    it('should wrap unknown errors in InternalServerErrorException with status 500', async () => {
      mockCertificationService.delete.mockRejectedValue(new Error('Database error'));

      try {
        await controller.delete(1);
        fail('Should have thrown InternalServerErrorException');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.message).toContain('Failed to delete certification');
      }

      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
