import { Test, TestingModule } from '@nestjs/testing';
import { HostingController } from './hosting.controller';

describe('HostingController', () => {
  let controller: HostingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostingController],
    }).compile();

    controller = module.get<HostingController>(HostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
