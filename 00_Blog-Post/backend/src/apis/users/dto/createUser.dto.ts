import { IsInt, IsNumber, IsObject, IsString, Min } from 'class-validator';
import { CreateProductSalesLocationInput } from 'src/apis/productsSalesLoctation/dto/createProductSalesLocation.dto';

export class CreateUserInput {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
