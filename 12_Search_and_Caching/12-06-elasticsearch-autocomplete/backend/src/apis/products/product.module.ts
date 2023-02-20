import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesLocation } from '../productsSalesLoctation/entities/productSalesLocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './entities/product.subscriber';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  //Typeorm 모듈 사용을 위해 Inject
  imports: [
    TypeOrmModule.forFeature([Product, ProductSalesLocation, ProductTag]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
      //node: 'http://localhost:9200',
    }),
  ],
  providers: [
    ProductResolver, //Resolver와 Service 주입 -> contructor에서 사용
    ProductService,
    ProductSubscriber,
  ],
})
export class ProductModule {
  //
}
