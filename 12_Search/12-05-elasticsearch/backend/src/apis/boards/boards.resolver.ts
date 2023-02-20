import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  //GraphQL 모듈의 Query 사용
  // @Query(() => String) //getHello의 리턴타입 정의 -> Docs 스키마 정의
  // getHello() {
  //   return this.boardService.hello();
  // }
  @Query(() => [Board]) //List는 대괄호로 감싸주기, Typescript 타입과 GraphQL 타입은 다르다.(number <-> Int), Model에 @Field를 적용시켜주어야 한다.
  fetchBoards() {
    const result = this.boardService.selectBoardList();
    return result;
  }
  //

  // @Mutation(() => String)
  // createBoard(
  //   //@Args({ nullable: true, name: 'writer' }) writer: string,
  //   //@Args('title') title: string,
  //   //@Args('contents') contents: string,
  //   @Args('createBoardInput') createBoardInput: CreateBoardInput, //GraphQL은 Input 타입을 따로 지정해주어야하는것에 유의
  // ) {
  //   this.boardService.insertBoard();
  //   return '게시글 등록 성공!';
  // }

  @Mutation(() => String)
  async cacheBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput, //GraphQL은 Input 타입을 따로 지정해주어야하는것에 유의
  ) {
    //캐시에 등록
    await this.cacheManager.set('boardKey', createBoardInput, {
      ttl: 0, //ttl을 영구적으로 주려면 0으로
    });

    //캐시에서 조회
    const mycache = await this.cacheManager.get('boardKey');
    console.log(mycache);

    return '게시글 등록 성공!';
  }
}
