import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { PortfolioRepository } from '../../repositories/portfolios.repository'
import { PortfolioEntity } from '../../entities/portfolios.entity';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreatePortfolioDto } from '../../dtos/portfolios.dto';

describe('PortfolioRepository', () => {
  let repository: PortfolioRepository;
  
  // Mock DataSource and its methods
  const mockEntityManager = {
    // Add methods if needed
  };
  
  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue(mockEntityManager),
  };

  // Create mocks for repository methods
  const mockFind = jest.fn();
  const mockFindOne = jest.fn();
  const mockFindOneBy = jest.fn();
  const mockCreate = jest.fn();
  const mockSave = jest.fn();
  const mockRemove = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioRepository,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    repository = module.get<PortfolioRepository>(PortfolioRepository);
    
    // Override repository methods with mocks
    repository.find = mockFind;
    repository.findOne = mockFindOne;
    repository.findOneBy = mockFindOneBy;
    repository.create = mockCreate;
    repository.save = mockSave;
    repository.remove = mockRemove;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all portfolios', async () => {
      const mockPortfolios = [
        {
          id: 1,
          name: 'Portfolio 1',
          link: 'https://portfolio1.com',
          userJobProfileId: 1,
          created_at: new Date(),
          updated_at: new Date(),
        } as PortfolioEntity,
      ];

      mockFind.mockResolvedValue(mockPortfolios);

      const result = await repository.findAll();

      expect(result).toEqual(mockPortfolios);
      expect(mockFind).toHaveBeenCalledWith({
        order: { created_at: 'DESC' },
      });
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockFind.mockRejectedValue(new Error('Database error'));

      await expect(repository.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(mockFind).toHaveBeenCalled();
    });
  });

  describe('findByUserJobProfileId', () => {
    it('should return portfolios for a specific user job profile', async () => {
      const mockPortfolios = [
        {
          id: 1,
          name: 'Portfolio 1',
          link: 'https://portfolio1.com',
          userJobProfileId: 1,
          created_at: new Date(),
          updated_at: new Date(),
        } as PortfolioEntity,
      ];

      mockFind.mockResolvedValue(mockPortfolios);

      const result = await repository.findByUserJobProfileId(1);

      expect(result).toEqual(mockPortfolios);
      expect(mockFind).toHaveBeenCalledWith({
        where: { userJobProfileId: 1 },
        order: { created_at: 'DESC' },
      });
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockFind.mockRejectedValue(new Error('Database error'));

      await expect(repository.findByUserJobProfileId(1)).rejects.toThrow(InternalServerErrorException);
      expect(mockFind).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a portfolio by ID', async () => {
      const portfolio = {
        id: 1,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as PortfolioEntity;

      mockFindOneBy.mockResolvedValue(portfolio);

      const result = await repository.findById(1);

      expect(result).toEqual(portfolio);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException when portfolio is not found', async () => {
      mockFindOneBy.mockResolvedValue(null);

      await expect(repository.findById(999)).rejects.toThrow(NotFoundException);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: 999 });
    });

    it('should rethrow NotFoundException', async () => {
      mockFindOneBy.mockRejectedValue(
        new NotFoundException('Portfolio with ID 999 not found'),
      );

      await expect(repository.findById(999)).rejects.toThrow(NotFoundException);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: 999 });
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockFindOneBy.mockRejectedValue(new Error('Database error'));

      await expect(repository.findById(1)).rejects.toThrow(InternalServerErrorException);
      expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('findOneByNameAndProfileId', () => {
    it('should return a portfolio by name and profile ID', async () => {
      const portfolio = {
        id: 1,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as PortfolioEntity;

      mockFindOne.mockResolvedValue(portfolio);

      const result = await repository.findOneByNameAndProfileId('Portfolio 1', 1);

      expect(result).toEqual(portfolio);
      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          name: 'Portfolio 1',
          userJobProfileId: 1
        }
      });
    });

    it('should return null when portfolio is not found', async () => {
      mockFindOne.mockResolvedValue(null);

      const result = await repository.findOneByNameAndProfileId('Non-existent', 1);

      expect(result).toBeNull();
      expect(mockFindOne).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockFindOne.mockRejectedValue(new Error('Database error'));

      await expect(repository.findOneByNameAndProfileId('Portfolio 1', 1)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockFindOne).toHaveBeenCalled();
    });
  });

  describe('findOneByLink', () => {
    it('should return a portfolio by link', async () => {
      const portfolio = {
        id: 1,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as PortfolioEntity;

      mockFindOne.mockResolvedValue(portfolio);

      const result = await repository.findOneByLink('https://portfolio1.com');

      expect(result).toEqual(portfolio);
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { link: 'https://portfolio1.com' }
      });
    });

    it('should return null when portfolio is not found', async () => {
      mockFindOne.mockResolvedValue(null);

      const result = await repository.findOneByLink('https://non-existent.com');

      expect(result).toBeNull();
      expect(mockFindOne).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      mockFindOne.mockRejectedValue(new Error('Database error'));

      await expect(repository.findOneByLink('https://portfolio1.com')).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(mockFindOne).toHaveBeenCalled();
    });
  });

  describe('createPortfolio', () => {
    const createDto: CreatePortfolioDto = {
      user_id: 1,
      name: 'New Portfolio',
      link: 'https://newportfolio.com',
    };

    it('should create and return a portfolio', async () => {
      const now = new Date();
      const portfolio = {
        id: 1,
        name: 'New Portfolio',
        link: 'https://newportfolio.com',
        userJobProfileId: 1,
        created_at: now,
        updated_at: now,
      } as PortfolioEntity;

      mockCreate.mockReturnValue(portfolio);
      mockSave.mockResolvedValue(portfolio);

      const result = await repository.createPortfolio(createDto);

      expect(result).toEqual(portfolio);
      expect(mockCreate).toHaveBeenCalledWith({
        name: createDto.name,
        link: createDto.link,
        userJobProfileId: createDto.user_id,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
      expect(mockSave).toHaveBeenCalledWith(portfolio);
    });

    it('should propagate errors if save fails', async () => {
      const portfolio = {
        name: 'New Portfolio',
        link: 'https://newportfolio.com',
        userJobProfileId: 1,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      } as PortfolioEntity;

      mockCreate.mockReturnValue(portfolio);
      const error = new Error('Database error');
      mockSave.mockRejectedValue(error);

      await expect(repository.createPortfolio(createDto)).rejects.toThrow(error);
      expect(mockCreate).toHaveBeenCalled();
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('deletePortfolio', () => {
    it('should delete a portfolio successfully', async () => {
      const portfolio = {
        id: 1,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as PortfolioEntity;

      // Create a spy for the findById method
      jest.spyOn(repository, 'findById').mockResolvedValue(portfolio);
      mockRemove.mockResolvedValue(portfolio);

      await repository.deletePortfolio(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(mockRemove).toHaveBeenCalledWith(portfolio);
    });

    it('should rethrow NotFoundException from findById', async () => {
      const notFoundError = new NotFoundException('Portfolio with ID 999 not found');
      jest.spyOn(repository, 'findById').mockRejectedValue(notFoundError);

      await expect(repository.deletePortfolio(999)).rejects.toThrow(NotFoundException);
      expect(repository.findById).toHaveBeenCalledWith(999);
      expect(mockRemove).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException when database operation fails', async () => {
      const portfolio = {
        id: 1,
        name: 'Portfolio 1',
        link: 'https://portfolio1.com',
        userJobProfileId: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as PortfolioEntity;

      jest.spyOn(repository, 'findById').mockResolvedValue(portfolio);
      mockRemove.mockRejectedValue(new Error('Database error'));

      await expect(repository.deletePortfolio(1)).rejects.toThrow(InternalServerErrorException);
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(mockRemove).toHaveBeenCalledWith(portfolio);
    });
  });
});