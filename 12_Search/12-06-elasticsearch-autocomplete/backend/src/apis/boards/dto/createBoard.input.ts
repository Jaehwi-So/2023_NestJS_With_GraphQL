import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

//graphQL의 Inpyt Type 정의하기
@InputType()
export class CreateBoardInput {
  @IsNotEmpty()
  @Field(() => String)
  writer: string;

  @IsNotEmpty()
  @Field(() => String)
  title: string;

  @IsNotEmpty()
  @Field(() => String)
  contents: string;
}
