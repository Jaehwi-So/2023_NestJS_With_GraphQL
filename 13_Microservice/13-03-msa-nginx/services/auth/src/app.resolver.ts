import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getAuth() {
    return '인증정보 조회';
  }

  @Mutation(() => String)
  login() {
    return '로그인 성공';
  }
}
