import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  //Typeorm 모듈 사용을 위해 Inject
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductResolver, //Resolver와 Service 주입 -> contructor에서 사용
    ProductService,
  ],
})
export class ProductModule {
  //
}
