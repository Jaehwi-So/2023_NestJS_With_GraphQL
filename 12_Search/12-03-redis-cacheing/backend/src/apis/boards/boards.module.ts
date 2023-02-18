import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardResolver } from './boards.resolver';
import { BoardService } from './boards.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  //controllers: [],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
