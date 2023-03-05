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
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
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
  selectProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get()
  selectProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
