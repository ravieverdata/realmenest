import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AdminEntity } from 'src/modules/admin/admin.entity';
import { AdminLoginHistoryEntity } from 'src/modules/admin/adminloginhistory.entity';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AdminService', () => {
  let service: AdminService;
  let adminRepository: AdminEntity;
  let adminLoginHistoryEntity: AdminLoginHistoryEntity;
  let jwtService: JwtService;


  const mockadminRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  const mockadminhisRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService,
      {
        provide: AdminEntity,
        useValue: mockadminRepository,
      },
      {
        provide: AdminLoginHistoryEntity,
        useValue: mockadminhisRepository,
      },
      {
        provide: JwtService,
        useValue: {
          signAsync: jest.fn(),
        },
      },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    adminRepository = module.get<AdminEntity>(AdminEntity);
    adminLoginHistoryEntity = module.get<AdminLoginHistoryEntity>(AdminLoginHistoryEntity);
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('getAllUsers => should return an array of Admins', async () => {
    //arrange
    const admin = {
      un: 'ravi',
      email: 'ravi@everdata.com',
    };
    const admins = [admin];
    jest.spyOn(mockadminRepository, 'find').mockReturnValue(admins);

    //act
    const result = await service.getAllUsers();

    // assert
    expect(result).toEqual(admins);
    expect(mockadminRepository.find).toBeCalled();
  });

  it('getuser => should find a user by a given id and return its data', async () => {
    //arrange
    const id = 4;
    const user = {
      id: 4,
      un: 'ravi',
      email: 'ravi@everdata.com',
    };

    jest.spyOn(mockadminRepository, 'findOne').mockReturnValue(user);

    //act
    const result = await service.getuser(id);

    expect(result).toEqual(user);
    expect(mockadminRepository.findOne).toBeCalled();
    expect(mockadminRepository.findOne).toBeCalledWith({ where: { id } });
  });

  describe('login', () => {
    it('should throw NotFoundException if admin is not found', async () => {

      const user = {
        id: 4,
        un: 'ravi',
        email: 'ravi@everdata.com',
      };
      
      jest.spyOn(mockadminRepository, 'findOneBy').mockResolvedValue(user);

      // Act and Assert
      await expect(service.login('ravi', 'ravi@2112', ':1')).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      // Arrange
      const user = {
        id: 4,
        un: 'ravi',
        email: 'ravi@everdata.com',
      };
      const un = 'ravi';
      const ps = 'ravi@2112';
      const ip = ':1';
      jest.spyOn(mockadminRepository, 'findOneBy').mockResolvedValue(user);

      // Act and Assert
      await expect(service.login(un, ps, ip)).rejects.toThrow(UnauthorizedException);
    });

    it('should update session status to "Logout" for active and pending login history', async () => {
      // Arrange
      const un = 'ravi';
      const ps = 'ravi@2112';
      const ip = ':1';

      const user = {
        id: 4,
        un: 'ravi',
        email: 'ravi@everdata.com',
      };
      const loginHistory = [{ unid: 1, sessionstatus: 'Active' }, { unid: 1, sessionstatus: 'Pending' }];
      jest.spyOn(mockadminhisRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(mockadminhisRepository, 'find').mockResolvedValue(loginHistory);

      // Act
      await service.login(un, ps, ip);

      // Assert
      expect(loginHistory[0].sessionstatus).toBe('Logout');
      expect(loginHistory[1].sessionstatus).toBe('Logout');
      expect(mockadminhisRepository.save).toHaveBeenCalledWith(loginHistory);
    });

    it('should generate OTP token and return it', async () => {
      // Arrange
      const un = 'ravi';
      const ps = 'ravi@2112';
      const ip = ':1';

      const user = {
        id: 4,
        un: 'ravi',
        email: 'ravi@everdata.com',
      };

      jest.spyOn(mockadminRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('otpToken');

      // Act
      const result = await service.login(un, ps, ip);

      // Assert
      expect(result).toEqual({
        access_token: 'otpToken',
        otp: true,
      });
    });

    it('should throw BadRequestException if JWT signing fails', async () => {
      // Arrange
      const un = 'ravi';
      const ps = 'ravi@2112';
      const ip = ':1';

      const user = {
        id: 4,
        un: 'ravi',
        email: 'ravi@everdata.com',
      };

      jest.spyOn(mockadminRepository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockRejectedValue(new Error('JWT signing error'));

      // Act and Assert
      await expect(service.login(un, ps, ip)).rejects.toThrow(BadRequestException);
    });
  });


});
