import {
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateProductSalesLocationInput } from 'src/apis/productsSalesLoctation/dto/updateProductSalesLocation.dto';

export class UpdateProductInput {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsObject()
  productSalesLocation: UpdateProductSalesLocationInput;

  @IsNumber()
  productCategoryId: number;

  @IsString({ each: true })
  productTags: string[];
}
