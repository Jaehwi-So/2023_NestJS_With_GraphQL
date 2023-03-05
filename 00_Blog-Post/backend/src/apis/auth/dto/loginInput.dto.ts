import { IsInt, IsNumber, IsObject, IsString, Min } from 'class-validator';

export class LoginInput {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
