import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Controller('productCategory')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  insertProductCategory() {
    return this.productCategoryService.insert({ name });
    //
  }

  @Get()
  selectProduct(): Promise<any> {
    return this.productCategoryService.selectList();
  }
}
