import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsObject, IsString, Min } from 'class-validator';
import { CreateProductSalesLocationInput } from 'src/apis/productsSalesLoctation/dto/createProductSalesLocation.dto';

export class CreateProductInput {
  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '설명' })
  @IsString()
  description: string;

  @ApiProperty({ description: '가격' })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ description: '상품 판매 장소' })
  @IsObject()
  productSalesLocation: CreateProductSalesLocationInput;

  @ApiProperty({ description: '상품 카테고리 ID' })
  @IsNumber()
  productCategoryId: number;

  @ApiProperty({ description: '상품 태그 ID 리스트' })
  @IsString({ each: true })
  productTags: string[];
}
