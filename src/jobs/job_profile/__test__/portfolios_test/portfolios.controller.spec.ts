import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from '../../controllers/portfolios.controller';
import { PortfolioService } from '../../services/portfolios.service';
import { PortfolioEntity } from '../../entities/portfolios.entity';
import { CreatePortfolioDto, PortfolioResponseDto } from '../../dtos/portfolios.dto';
import { 
  NotFoundException, 
  InternalServerErrorException, 
  ConflictException,
  HttpStatus
} from '@nestjs/common';


describe('PortfolioController', () => {
  let controller: PortfolioController;
  let service: PortfolioService;

  // Mock logger to prevent actual logging during tests
  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  // Create mock for the service
  const mockPortfolioService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: mockPortfolioService,
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    service = module.get<PortfolioService>(PortfolioService);

    // Replace the logger with our mock
    (controller as any).logger = mockLogger;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreatePortfolioDto = {
      name: 'New Portfolio',
      link: 'https://newportfolio.com',
      user_id: 1,
    };

    const mockResponse: PortfolioResponseDto = {
      id: 1,
      name: 'New Portfolio',
      link: 'https://newportfolio.com',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create a new portfolio and return success response', async () => {
      // Arrange
      mockPortfolioService.create.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
      expect(mockPortfolioService.create).toHaveBeenCalledWith(createDto);
    });

    it('should propagate ConflictException from service', async () => {
      // Arrange
      const error = new ConflictException('You already have a portfolio with this name');
      mockPortfolioService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(createDto)).rejects.toThrow(ConflictException);
      expect(mockPortfolioService.create).toHaveBeenCalledWith(createDto);
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException for non-HTTP errors', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPortfolioService.create.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.create(createDto)).rejects.toThrow(InternalServerErrorException);
      expect(mockPortfolioService.create).toHaveBeenCalledWith(createDto);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all portfolios with success response', async () => {
      // Arrange
      const mockPortfolios: PortfolioEntity[] = [
        {
          id: 1,
          name: 'Portfolio 1',
          link: 'https://portfolio1.com',
          userJobProfileId: 1,
          userJobProfile: null as any,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Portfolio 2',
          link: 'https://portfolio2.com',
          userJobProfileId: 1,
          userJobProfile: null as any,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      mockPortfolioService.findAll.mockResolvedValue(mockPortfolios);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual({
        success: true,
        data: mockPortfolios,
      });
      expect(mockPortfolioService.findAll).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when service throws error', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPortfolioService.findAll.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(mockPortfolioService.findAll).toHaveBeenCalled();
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    const portfolioId = 1;

    it('should return a portfolio by id with success response', async () => {
      // Arrange
      const mockPortfolio: PortfolioEntity = {
        id: portfolioId,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        userJobProfile: null as any,
        created_at: new Date(),
        updated_at: new Date(),
      };
      mockPortfolioService.findById.mockResolvedValue(mockPortfolio);

      // Act
      const result = await controller.findById(portfolioId);

      // Assert
      expect(result).toEqual({
        success: true,
        data: mockPortfolio,
      });
      expect(mockPortfolioService.findById).toHaveBeenCalledWith(portfolioId);
    });

    it('should propagate NotFoundException from service', async () => {
      // Arrange
      const error = new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
      mockPortfolioService.findById.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findById(portfolioId)).rejects.toThrow(NotFoundException);
      expect(mockPortfolioService.findById).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPortfolioService.findById.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findById(portfolioId)).rejects.toThrow(InternalServerErrorException);
      expect(mockPortfolioService.findById).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    const portfolioId = 1;

    it('should delete a portfolio and return success response', async () => {
      // Arrange
      mockPortfolioService.delete.mockResolvedValue(undefined);

      // Act
      const result = await controller.delete(portfolioId);

      // Assert
      expect(result).toEqual({
        success: true,
        message: 'Portfolio deleted successfully',
      });
      expect(mockPortfolioService.delete).toHaveBeenCalledWith(portfolioId);
    });

    it('should propagate NotFoundException from service', async () => {
      // Arrange
      const error = new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
      mockPortfolioService.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.delete(portfolioId)).rejects.toThrow(NotFoundException);
      expect(mockPortfolioService.delete).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPortfolioService.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.delete(portfolioId)).rejects.toThrow(InternalServerErrorException);
      expect(mockPortfolioService.delete).toHaveBeenCalledWith(portfolioId);
      expect(mockLogger.error).toHaveBeenCalled();
    });
  });
});