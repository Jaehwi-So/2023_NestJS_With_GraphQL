import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  // ==== ElasticSearch TEST!! ====
  @Mutation(() => Product)
  createProductElastic(
    @Args('createProductInput') input: CreateProductInput, //
  ) {
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct2', //컬렉션
      document: {
        ...input,
      },
    });
  }

  @Query(() => [Product])
  async fetchProductsElastic() {
    const result = await this.elasticsearchService.search({
      index: 'myproduct2',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));
  }
  // === ElasticSearch TEST!! ===

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') input: CreateProductInput, //
  ) {
    return this.productService.create({ input });
  }

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('id') id: string, //
  ) {
    return this.productService.findOne({ id });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') input: UpdateProductInput,
  ) {
    //판매완료 여부 검증
    await this.productService.checkSoldOut({ id });

    return this.productService.update({ id, input });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('id') id: string, //
  ) {
    return this.productService.deleteSoft({ id });
  }
}
