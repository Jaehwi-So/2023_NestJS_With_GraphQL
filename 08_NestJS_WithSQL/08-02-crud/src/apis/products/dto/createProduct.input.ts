import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

//graphQL의 Inpyt Type 정의하기
@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  @Min(0)
  price: number;
}
