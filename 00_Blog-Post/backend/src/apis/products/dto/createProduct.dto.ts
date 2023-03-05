import { IsInt, IsNumber, IsObject, IsString, Min } from 'class-validator';
import { CreateProductSalesLocationInput } from 'src/apis/productsSalesLoctation/dto/createProductSalesLocation.dto';

export class CreateProductInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsObject()
  productSalesLocation: CreateProductSalesLocationInput;

  @IsNumber()
  productCategoryId: number;

  @IsString({ each: true })
  productTags: string[];
}
