import { Test, TestingModule } from '@nestjs/testing';
import { FileRemovalService } from './fileremoval.service';

describe('FileremovalService', () => {
  let service: FileRemovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileRemovalService],
    }).compile();

    service = module.get<FileRemovalService>(FileRemovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
