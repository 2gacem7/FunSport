import { Test, TestingModule } from '@nestjs/testing';
import { CommentariesController } from './commentaries.controller';

describe('CommentariesController', () => {
  let controller: CommentariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentariesController],
    }).compile();

    controller = module.get<CommentariesController>(CommentariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
