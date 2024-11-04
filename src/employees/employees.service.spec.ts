import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseService } from '../database/database.service';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let databaseService: DatabaseService;
  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, DatabaseService],
    }).compile();
    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  afterAll(async () => {
    await databaseService.$disconnect();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user by user id', async () => {
    service.create(
      {
        "name": "testUser",
        "email": "example@gmail.com",
        "role": "ENGINEER"
      }
    );
    const user = await service.findOne(20);
    expect(service.findOne(user.id)).toBeDefined();
    expect(service.findOne(user.id)).toBeTruthy();
    expect(user.name).toEqual('testUser');
    service.remove(user.id);
  });
});
