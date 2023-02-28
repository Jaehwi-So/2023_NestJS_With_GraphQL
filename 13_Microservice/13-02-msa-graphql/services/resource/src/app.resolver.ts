import { AppService } from './app.service';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  fetchBoards() {
    console.log();
    return '게시글 데이터 보내주기1';
  }
}
