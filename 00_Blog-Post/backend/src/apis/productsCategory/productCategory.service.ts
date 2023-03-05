import { Injectable } from '@nestjs/common';
import {
  InjectConnection,
  InjectDataSource,
  InjectRepository,
} from '@nestjs/typeorm';
import { Connection, getConnectionManager, Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>, //DB Connection 객체, Generic을 지정해주어야함

    private readonly connection: Connection, //Typeorm 지원
  ) {}

  async insert({ name }) {
    const result = await this.productCategoryRepository.save({
      name: name,
    });
    return result;
  }

  async selectList() {
    const result = await this.productCategoryRepository.find({});
    return result;
  }
}
