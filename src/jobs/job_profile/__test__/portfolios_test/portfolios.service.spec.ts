import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PortfolioService } from '../../services/portfolios.service';
import { PortfolioRepository } from '../../repositories/portfolios.repository';
import { PortfolioEntity } from '../../entities/portfolios.entity';
import { CreatePortfolioDto, PortfolioResponseDto } from '../../dtos/portfolios.dto';
import { UserJobProfile } from '../../../../core/entities/user-job-profile.entity';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let repository: PortfolioRepository;

  // Mock logger to suppress logging during tests
  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  // Create mock for the repository
  const mockPortfolioRepository = {
    findAll: jest.fn(),
    findByUserJobProfileId: jest.fn(),
    findById: jest.fn(),
    findOneByNameAndProfileId: jest.fn(),
    findOneByLink: jest.fn(),
    createPortfolio: jest.fn(),
    deletePortfolio: jest.fn(),
  };

  const mockUserJobProfile = {
    id: 1,
    portfolios: [],
    gender: 'Male',
    dob: new Date(),
    career_level: 'Mid',
    desired_salary: 100000,
  } as unknown as UserJobProfile;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: PortfolioRepository,
          useValue: mockPortfolioRepository,
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    repository = module.get<PortfolioRepository>(PortfolioRepository);

    (service as any).logger = mockLogger;

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all portfolios', async () => {

      const mockPortfolios: PortfolioEntity[] = [
        {
          id: 1,
          name: 'Portfolio 1',
          link: 'https://portfolio1.com',
          userJobProfileId: 1,
          userJobProfile: mockUserJobProfile,
          created_at: new Date('2023-01-01'),
          updated_at: new Date('2023-01-01'),
        },
        {
          id: 2,
          name: 'Portfolio 2',
          link: 'https://portfolio2.com',
          userJobProfileId: 1,
          userJobProfile: mockUserJobProfile,
          created_at: new Date('2023-01-02'),
          updated_at: new Date('2023-01-02'),
        },
      ];
      mockPortfolioRepository.findAll.mockResolvedValue(mockPortfolios);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockPortfolios);
      expect(mockPortfolioRepository.findAll).toHaveBeenCalled();
      expect(mockLogger.log).toHaveBeenCalledWith('Fetching all portfolios');
    });

    it('should propagate errors from repository', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPortfolioRepository.findAll.mockRejectedValue(error);

      // Act & Assert
      await expect(service.findAll()).rejects.toThrow(error);
      expect(mockPortfolioRepository.findAll).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalledWith(
        'Error fetching portfolios: Database error',
        error.stack,
      );
    });
  });

  describe('findByUserId', () => {
    it('should return portfolios for a specific user', async () => {
      // Arrange
      const userId = 1;
      const mockPortfolios: PortfolioEntity[] = [
        {
          id: 1,
          name: 'Portfolio 1',
          link: 'https://portfolio1.com',
          userJobProfileId: userId,
          userJobProfile: mockUserJobProfile,
          created_at: new Date('2023-01-01'),
          updated_at: new Date('2023-01-01'),
        },
      ];
      mockPortfolioRepository.findByUserJobProfileId.mockResolvedValue(mockPortfolios);

      // Act
      const result = await service.findByUserId(userId);

      // Assert
      expect(result).toEqual(mockPortfolios);
      expect(mockPortfolioRepository.findByUserJobProfileId).toHaveBeenCalledWith(userId);
      expect(mockLogger.log).toHaveBeenCalledWith(`Fetching portfolios for user ID: ${userId}`);
    });

    it('should return empty array when user has no portfolios', async () => {
      // Arrange
      const userId = 999;
      mockPortfolioRepository.findByUserJobProfileId.mockResolvedValue([]);

      // Act
      const result = await service.findByUserId(userId);

      // Assert
      expect(result).toEqual([]);
      expect(mockPortfolioRepository.findByUserJobProfileId).toHaveBeenCalledWith(userId);
    });

    it('should propagate errors from repository', async () => {
      // Arrange
      const userId = 1;
      const error = new Error('Database error');
      mockPortfolioRepository.findByUserJobProfileId.mockRejectedValue(error);

      // Act & Assert
      await expect(service.findByUserId(userId)).rejects.toThrow(error);
      expect(mockPortfolioRepository.findByUserJobProfileId).toHaveBeenCalledWith(userId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Error fetching portfolios for user ID ${userId}: Database error`,
        error.stack,
      );
    });
  });

  describe('findById', () => {
    it('should return a portfolio by id', async () => {
      // Arrange
      const portfolioId = 1;
      const mockPortfolio: PortfolioEntity = {
        id: portfolioId,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        userJobProfile: mockUserJobProfile,
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2023-01-01'),
      };
      mockPortfolioRepository.findById.mockResolvedValue(mockPortfolio);

      // Act
      const result = await service.findById(portfolioId);

      // Assert
      expect(result).toEqual(mockPortfolio);
      expect(mockPortfolioRepository.findById).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.log).toHaveBeenCalledWith(`Fetching portfolio with id: ${portfolioId}`);
    });

    it('should propagate NotFoundException from repository', async () => {
      // Arrange
      const portfolioId = 999;
      const error = new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
      mockPortfolioRepository.findById.mockRejectedValue(error);

      // Act & Assert
      await expect(service.findById(portfolioId)).rejects.toThrow(NotFoundException);
      expect(mockPortfolioRepository.findById).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Error fetching portfolio with id ${portfolioId}: Portfolio with ID ${portfolioId} not found`,
        error.stack,
      );
    });
  });

  describe('create', () => {
    // Define test data
    const createDto: CreatePortfolioDto = {
      name: 'New Portfolio',
      link: 'https://newportfolio.com',
      user_id: 1,
    };

    const createdEntity: PortfolioEntity = {
      id: 3,
      name: 'New Portfolio',
      link: 'https://newportfolio.com',
      userJobProfileId: 1,
      userJobProfile: mockUserJobProfile,
      created_at: new Date('2023-01-03'),
      updated_at: new Date('2023-01-03'),
    };

    const expectedResponse: PortfolioResponseDto = {
      id: 3,
      name: 'New Portfolio',
      link: 'https://newportfolio.com',
      user_id: 1,
      created_at: createdEntity.created_at,
      updated_at: createdEntity.updated_at,
    };

    it('should create and return a new portfolio', async () => {
      // Arrange
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(null);
      mockPortfolioRepository.findOneByLink.mockResolvedValue(null);
      mockPortfolioRepository.createPortfolio.mockResolvedValue(createdEntity);

      // Act
      const result = await service.create(createDto);

      // Assert
      expect(result).toEqual(expectedResponse);
      expect(mockPortfolioRepository.findOneByNameAndProfileId).toHaveBeenCalledWith(
        createDto.name,
        createDto.user_id,
      );
      expect(mockPortfolioRepository.findOneByLink).toHaveBeenCalledWith(createDto.link);
      expect(mockPortfolioRepository.createPortfolio).toHaveBeenCalledWith(createDto);
      expect(mockLogger.log).toHaveBeenCalledWith('Creating new portfolio');
    });

    it('should throw ConflictException if portfolio with same name exists', async () => {
      // Arrange
      const existingPortfolio: PortfolioEntity = {
        id: 1,
        name: 'New Portfolio',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        userJobProfile: mockUserJobProfile,
        created_at: new Date('2023-01-01'),
        updated_at: new Date('2023-01-01'),
      };
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(existingPortfolio);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException(`You already have a portfolio named "${createDto.name}"`),
      );
      expect(mockPortfolioRepository.findOneByNameAndProfileId).toHaveBeenCalledWith(
        createDto.name,
        createDto.user_id,
      );
      expect(mockPortfolioRepository.createPortfolio).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if portfolio with same link exists', async () => {
      // Arrange
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(null);

      const existingPortfolio: PortfolioEntity = {
        id: 2,
        name: 'Another Portfolio',
        link: 'https://newportfolio.com',
        userJobProfileId: 2,
        userJobProfile: mockUserJobProfile,
        created_at: new Date('2023-01-02'),
        updated_at: new Date('2023-01-02'),
      };
      mockPortfolioRepository.findOneByLink.mockResolvedValue(existingPortfolio);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException(`The link "${createDto.link}" is already in use`),
      );
      expect(mockPortfolioRepository.findOneByNameAndProfileId).toHaveBeenCalled();
      expect(mockPortfolioRepository.findOneByLink).toHaveBeenCalled();
      expect(mockPortfolioRepository.createPortfolio).not.toHaveBeenCalled();
    });

    it('should handle database constraint violation for name', async () => {
      // Arrange
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(null);
      mockPortfolioRepository.findOneByLink.mockResolvedValue(null);

      const dbError: any = new Error('Duplicate key');
      dbError.code = '23505';
      dbError.detail = 'Key (name)=(New Portfolio) already exists';

      mockPortfolioRepository.createPortfolio.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException('You already have a portfolio with this name'),
      );
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should handle database constraint violation for link', async () => {
      // Arrange
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(null);
      mockPortfolioRepository.findOneByLink.mockResolvedValue(null);

      const dbError: any = new Error('Duplicate key');
      dbError.code = '23505';
      dbError.detail = 'Key (link)=(https://newportfolio.com) already exists';

      mockPortfolioRepository.createPortfolio.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException('This portfolio link is already in use'),
      );
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should handle generic database constraint violation', async () => {
      // Arrange
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(null);
      mockPortfolioRepository.findOneByLink.mockResolvedValue(null);

      const dbError: any = new Error('Duplicate key');
      dbError.code = '23505';
      dbError.detail = 'Key violation';

      mockPortfolioRepository.createPortfolio.mockRejectedValue(dbError);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(
        new ConflictException('A portfolio with these details already exists'),
      );
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should propagate other errors', async () => {
      // Arrange
      mockPortfolioRepository.findOneByNameAndProfileId.mockResolvedValue(null);
      mockPortfolioRepository.findOneByLink.mockResolvedValue(null);

      const error = new Error('Unexpected error');
      mockPortfolioRepository.createPortfolio.mockRejectedValue(error);

      // Act & Assert
      await expect(service.create(createDto)).rejects.toThrow(error);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a portfolio by id', async () => {
      // Arrange
      const portfolioId = 1;
      mockPortfolioRepository.deletePortfolio.mockResolvedValue(undefined);

      // Act
      await service.delete(portfolioId);

      // Assert
      expect(mockPortfolioRepository.deletePortfolio).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.log).toHaveBeenCalledWith(`Deleting portfolio with id: ${portfolioId}`);
    });

    it('should propagate NotFoundException from repository', async () => {
      // Arrange
      const portfolioId = 999;
      const error = new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
      mockPortfolioRepository.deletePortfolio.mockRejectedValue(error);

      // Act & Assert
      await expect(service.delete(portfolioId)).rejects.toThrow(NotFoundException);
      expect(mockPortfolioRepository.deletePortfolio).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Error deleting portfolio with id ${portfolioId}: Portfolio with ID ${portfolioId} not found`,
        error.stack,
      );
    });

    it('should propagate other errors from repository', async () => {
      // Arrange
      const portfolioId = 1;
      const error = new Error('Database error');
      mockPortfolioRepository.deletePortfolio.mockRejectedValue(error);

      // Act & Assert
      await expect(service.delete(portfolioId)).rejects.toThrow(error);
      expect(mockPortfolioRepository.deletePortfolio).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalledWith(
        `Error deleting portfolio with id ${portfolioId}: Database error`,
        error.stack,
      );
    });
  });
});
