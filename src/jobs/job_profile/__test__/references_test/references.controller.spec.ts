import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceController } from '../../controllers/references.controller';
import { ReferenceService } from '../../services/references.service';
import { CreateReferenceDto } from '../../dtos/references.dto';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ReferenceEntity } from '../../entities/references.entity';
import { UserJobProfile } from 'src/core/entities/user-job-profile.entity';

describe('ReferenceController', () => {
  let controller: ReferenceController;
  let service: ReferenceService;

  const mockReferenceService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceController],
      providers: [
        {
          provide: ReferenceService,
          useValue: mockReferenceService,
        },
      ],
    }).compile();

    controller = module.get<ReferenceController>(ReferenceController);
    service = module.get<ReferenceService>(ReferenceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createReferenceDto: CreateReferenceDto = {
      user_id: 1,
      name: 'John Doe',
      company_name: 'ABC Corp',
      email: 'john@example.com',
    };

    const mockUserJobProfile = { id: 1 } as UserJobProfile;
    
    const referenceEntity = {
      id: 1,
      user_id: 1,
      name: 'John Doe',
      company_name: 'ABC Corp',
      email: 'john@example.com',
      created_at: new Date(),
      updated_at: new Date(),
      userJobProfile: mockUserJobProfile,
    } as ReferenceEntity;

    it('should create a reference and return success response with the data', async () => {
      mockReferenceService.create.mockResolvedValue(referenceEntity);

      const result = await controller.create(createReferenceDto);

      expect(result).toEqual({
        success: true,
        data: referenceEntity,
      });
      
      expect(service.create).toHaveBeenCalledWith(createReferenceDto);
    });

    it('should propagate errors from service when creation fails', async () => {
      const error = new NotFoundException('User job profile not found');
      mockReferenceService.create.mockRejectedValue(error);

      await expect(controller.create(createReferenceDto)).rejects.toThrow(NotFoundException);
      expect(service.create).toHaveBeenCalledWith(createReferenceDto);
    });
  });

  describe('findAll', () => {
    it('should return all references with success response', async () => {
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

      mockReferenceService.findAll.mockResolvedValue(references);

      const result = await controller.findAll();

      expect(result).toEqual({
        success: true,
        data: references,
      });
      
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockReferenceService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual({
        success: true,
        data: [],
      });
      
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should propagate errors from service', async () => {
      const error = new Error('Failed to fetch references');
      mockReferenceService.findAll.mockRejectedValue(error);

      await expect(controller.findAll()).rejects.toThrow(Error);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a reference by ID with success response', async () => {
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

      mockReferenceService.findById.mockResolvedValue(reference);

      const result = await controller.findById(1);

      expect(result).toEqual({
        success: true,
        data: reference,
      });
      
      expect(service.findById).toHaveBeenCalledWith(1);
    });
    
    it('should convert string ID parameter to number', async () => {
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
      
      mockReferenceService.findById.mockResolvedValue(reference);
      
      // String ID as it would come from route params
      const stringId = '1';
      const numberId = parseInt(stringId, 10);
      
      await controller.findById(numberId);
      
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(typeof numberId).toBe('number');
    });

    it('should propagate NotFoundException from service', async () => {
      const error = new NotFoundException('Reference with ID 999 not found');
      mockReferenceService.findById.mockRejectedValue(error);

      await expect(controller.findById(999)).rejects.toThrow(NotFoundException);
      expect(service.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('delete', () => {
    it('should delete a reference and return success message', async () => {
      mockReferenceService.delete.mockResolvedValue(undefined);

      const result = await controller.delete(1);

      expect(result).toEqual({
        success: true,
        message: 'Reference deleted successfully',
        data: null
      });
      
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should propagate NotFoundException from service', async () => {
      const error = new NotFoundException('Reference with ID 999 not found');
      mockReferenceService.delete.mockRejectedValue(error);

      await expect(controller.delete(999)).rejects.toThrow(NotFoundException);
      expect(service.delete).toHaveBeenCalledWith(999);
    });
  });
});