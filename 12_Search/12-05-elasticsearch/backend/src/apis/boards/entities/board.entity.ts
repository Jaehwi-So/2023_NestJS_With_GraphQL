import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //MySQL 타입
@ObjectType() //graphQL의 Type 적용
export class Board {
  @PrimaryGeneratedColumn('increment') //Primary Key
  @Field(() => Int) //graphQL의 Type 적용
  number: number;

  @Column() //MySQL 타입
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
