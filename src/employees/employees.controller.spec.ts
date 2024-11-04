import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let databaseService: DatabaseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, DatabaseService],
    }).compile();
    databaseService = module.get<DatabaseService>(DatabaseService);
    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
