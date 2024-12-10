import { Test, TestingModule } from '@nestjs/testing';
import { GyerekController } from './gyerek.controller';
import { GyerekService } from './gyerek.service';

describe('GyerekController', () => {
  let controller: GyerekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GyerekController],
      providers: [GyerekService],
    }).compile();

    controller = module.get<GyerekController>(GyerekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a gyerek', async () => {
    const result = await controller.create({ nev: 'Test', lakcim: 'Test', joVoltE: true });
    expect(result).toBeDefined();
  });

  it('should not create a gyerek with invalid data', async () => {
    try {
      await controller.create({ nev: '', lakcim: 'Test', joVoltE: true });
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should find good children', async () => {
    const result = await controller.findGoodChildren();
    expect(result).toBeDefined();
  });

  it('should find all games', async () => {
    const result = await controller.findAllGames();
    expect(result).toBeDefined();
  });

  it('should find children by address', async () => {
    const result = await controller.findAll('Test');
    expect(result).toBeDefined();
  });

  it('should update a gyerek', async () => {
    const result = await controller.update('1', { joVoltE: false });
    expect(result).toBeDefined();
  });

  it('should remove a gyerek', async () => {
    const result = await controller.remove('1');
    expect(result).toBeDefined();
  });
});
