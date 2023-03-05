import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryController } from './productCategory.controller';
import { ProductCategoryService } from './productCategory.service';

@Module({
  //Typeorm 모듈 사용을 위해 Inject
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {
  //
}
