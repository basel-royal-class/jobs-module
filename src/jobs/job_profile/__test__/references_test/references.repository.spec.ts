import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReferenceRepository } from '../../repositories/references.repository';
import { ReferenceEntity } from '../../entities/references.entity';
import { UserJobProfile } from '../../../../core/entities/user-job-profile.entity';
import { CreateReferenceDto } from '../../dtos/references.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('ReferenceRepository', () => {
  let repository: ReferenceRepository;
  let referenceRepo: Repository<ReferenceEntity>;
  let userJobProfileRepo: Repository<UserJobProfile>;

  const mockReferenceRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockUserJobProfileRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferenceRepository,
        {
          provide: getRepositoryToken(ReferenceEntity),
          useValue: mockReferenceRepository,
        },
        {
          provide: getRepositoryToken(UserJobProfile),
          useValue: mockUserJobProfileRepository,
        },
      ],
    }).compile();

    repository = module.get<ReferenceRepository>(ReferenceRepository);
    referenceRepo = module.get<Repository<ReferenceEntity>>(getRepositoryToken(ReferenceEntity));
    userJobProfileRepo = module.get<Repository<UserJobProfile>>(getRepositoryToken(UserJobProfile));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
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

      mockReferenceRepository.find.mockResolvedValue(references);

      const result = await repository.findAll();

      expect(result).toEqual(references);
      expect(mockReferenceRepository.find).toHaveBeenCalledWith({
        order: { created_at: 'DESC' },
        relations: ['userJobProfile'],
      });
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockReferenceRepository.find.mockImplementation(() => {
        throw new InternalServerErrorException('Database error while fetching references');
      });

      await expect(repository.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(mockReferenceRepository.find).toHaveBeenCalled();
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

      mockReferenceRepository.findOne.mockResolvedValue(reference);

      const result = await repository.findById(1);

      expect(result).toEqual(reference);
      expect(mockReferenceRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['userJobProfile'],
      });
    });

    it('should throw NotFoundException when reference is not found', async () => {
      mockReferenceRepository.findOne.mockResolvedValue(null);

      await expect(repository.findById(999)).rejects.toThrow(NotFoundException);
      expect(mockReferenceRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['userJobProfile'],
      });
    });

    it('should rethrow NotFoundException', async () => {
      mockReferenceRepository.findOne.mockRejectedValue(
        new NotFoundException('Reference with ID 999 not found'),
      );

      await expect(repository.findById(999)).rejects.toThrow(NotFoundException);
      expect(mockReferenceRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['userJobProfile'],
      });
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockReferenceRepository.findOne.mockRejectedValue(new Error('Database error'));

      await expect(repository.findById(1)).rejects.toThrow(InternalServerErrorException);
      expect(mockReferenceRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['userJobProfile'],
      });
    });
  });

  describe('createReference', () => {
    const createDto: CreateReferenceDto = {
      user_id: 1,
      name: 'John Doe',
      company_name: 'ABC Corp',
      email: 'john@example.com',
    };

    const mockUserJobProfile = { id: 1 } as UserJobProfile;

    it('should create and return a reference', async () => {
      mockUserJobProfileRepository.findOne.mockResolvedValue(mockUserJobProfile);

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

      mockReferenceRepository.create.mockReturnValue(reference);
      mockReferenceRepository.save.mockResolvedValue(reference);

      const result = await repository.createReference(createDto);

      expect(result).toEqual(reference);
      expect(mockUserJobProfileRepository.findOne).toHaveBeenCalledWith({
        where: { id: createDto.user_id },
      });
      expect(mockReferenceRepository.create).toHaveBeenCalled();
      expect(mockReferenceRepository.save).toHaveBeenCalledWith(reference);
    });

    it('should throw NotFoundException when user job profile is not found', async () => {
      mockUserJobProfileRepository.findOne.mockResolvedValue(null);

      await expect(repository.createReference(createDto)).rejects.toThrow(NotFoundException);
      expect(mockUserJobProfileRepository.findOne).toHaveBeenCalled();
      expect(mockReferenceRepository.create).not.toHaveBeenCalled();
      expect(mockReferenceRepository.save).not.toHaveBeenCalled();
    });

    it('should rethrow NotFoundException', async () => {
      const error = new NotFoundException('User profile not found');
      mockUserJobProfileRepository.findOne.mockRejectedValue(error);

      await expect(repository.createReference(createDto)).rejects.toThrow(NotFoundException);
      expect(mockUserJobProfileRepository.findOne).toHaveBeenCalled();
    });

    it('should rethrow QueryFailedError', async () => {
      mockUserJobProfileRepository.findOne.mockResolvedValue(mockUserJobProfile);

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

      mockReferenceRepository.create.mockReturnValue(reference);
      const queryError = new QueryFailedError('query', [], new Error('duplicate key'));
      mockReferenceRepository.save.mockRejectedValue(queryError);

      await expect(repository.createReference(createDto)).rejects.toThrow(QueryFailedError);
      expect(mockUserJobProfileRepository.findOne).toHaveBeenCalled();
      expect(mockReferenceRepository.create).toHaveBeenCalled();
      expect(mockReferenceRepository.save).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockUserJobProfileRepository.findOne.mockResolvedValue(mockUserJobProfile);

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

      mockReferenceRepository.create.mockReturnValue(reference);
      mockReferenceRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(repository.createReference(createDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockUserJobProfileRepository.findOne).toHaveBeenCalled();
      expect(mockReferenceRepository.create).toHaveBeenCalled();
      expect(mockReferenceRepository.save).toHaveBeenCalled();
    });
  });

  describe('deleteReference', () => {
    it('should delete a reference successfully', async () => {
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

      const findByIdSpy = jest.spyOn(repository, 'findById').mockResolvedValue(reference);
      mockReferenceRepository.remove.mockResolvedValue(reference);

      await repository.deleteReference(1);

      expect(findByIdSpy).toHaveBeenCalledWith(1);
      expect(mockReferenceRepository.remove).toHaveBeenCalledWith(reference);
    });

    it('should rethrow NotFoundException from findById', async () => {
      const notFoundError = new NotFoundException('Reference with ID 999 not found');
      const findByIdSpy = jest.spyOn(repository, 'findById').mockRejectedValue(notFoundError);

      await expect(repository.deleteReference(999)).rejects.toThrow(NotFoundException);
      expect(findByIdSpy).toHaveBeenCalledWith(999);
      expect(mockReferenceRepository.remove).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
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

      const findByIdSpy = jest.spyOn(repository, 'findById').mockResolvedValue(reference);
      mockReferenceRepository.remove.mockRejectedValue(new Error('Database error'));

      await expect(repository.deleteReference(1)).rejects.toThrow(InternalServerErrorException);
      expect(findByIdSpy).toHaveBeenCalledWith(1);
      expect(mockReferenceRepository.remove).toHaveBeenCalledWith(reference);
    });
  });
});
