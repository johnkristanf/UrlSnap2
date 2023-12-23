import { Test, TestingModule } from '@nestjs/testing';
import { FileremovalService } from './fileremoval.service';

describe('FileremovalService', () => {
  let service: FileremovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileremovalService],
    }).compile();

    service = module.get<FileremovalService>(FileremovalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
