import { Field, InputType } from '@nestjs/graphql';

//graphQL의 Inpyt Type 정의하기
@InputType()
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;
}
