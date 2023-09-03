import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('product')
@ApiTags('상품 API')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: '상품 생성 API', description: '상품을 등록합니다.' })
  @ApiCreatedResponse({
    description: '상품 등록에 성공하면 해당 상품 정보 반환',
    type: Product,
  })
  createProduct(@Body() input: CreateProductInput): Promise<Product> {
    return this.productService.create(input);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() input: UpdateProductInput,
  ): Promise<Product> {
    if (id != input.id) {
      throw new ForbiddenException();
    }
    return this.productService.modify(input);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<boolean> {
    return this.productService.delete(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: '상품 조회 API',
    description: '해당 ID에 해당하는 상품 조회',
  })
  @ApiCreatedResponse({
    description: '단일 상품 정보 응답',
    type: Product,
  })
  selectProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get()
  selectProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
