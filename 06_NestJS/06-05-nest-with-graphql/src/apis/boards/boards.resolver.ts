import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}
  //GraphQL 모듈의 Query 사용
  @Query(() => String) //getHello의 리턴타입 정의 -> Docs 스키마 정의
  getHello() {
    return this.boardService.hello();
  }
}
