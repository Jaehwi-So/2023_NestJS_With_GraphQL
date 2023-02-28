// app.resolver.ts

import { AppService } from './app.service';
import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(() => String)
  login() {
    return 'login 성공!!!';
  }

  // @Query(() => String)
  // hello() {
  //   return 'login 성공!!';
  // }
}
