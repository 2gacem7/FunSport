import { Test, TestingModule } from '@nestjs/testing';
import { CommentariesService } from './commentaries.service';

describe('CommentariesService', () => {
  let service: CommentariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentariesService],
    }).compile();

    service = module.get<CommentariesService>(CommentariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
