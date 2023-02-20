import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // ==== ElasticSearch TEST!! ====
  @Mutation(() => Product)
  createProductElastic(
    @Args('createProductInput') input: CreateProductInput, //
  ) {
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct4', //컬렉션
      document: {
        ...input,
      },
    });
  }

  @Query(() => [Product])
  async fetchProductsSearch(
    @Args({ name: 'keyword', nullable: true }) keyword: string,
  ) {
    //1. Redis에 캐시되어 있는지 확인
    const productsCache = await this.cacheManager.get(`products:${keyword}`);
    if (productsCache) {
      console.log('Use Cache');
      return productsCache;
    }

    //2. 캐시가 되어있지 않다면 Elastic search에서 조회하기(유저가 검색한 검색어로 조회하기)

    // const result = await this.elasticsearchService.search({
    //   index: 'myproduct4',
    //   query: {
    //     match: {
    //       description: keyword,
    //     },
    //   },
    // });

    const result = await this.elasticsearchService.search({
      index: 'myproduct4',
      query: {
        bool: {
          should: [
            { term: { name: keyword } },
            { term: { description: keyword } },
          ],
        },
      },
    });

    const products = result.hits.hits.map((el: any) => ({
      id: el._source.id,
      name: el._source.name,
      description: el._source.description,
      price: el._source.price,
    }));
    //3. 엘라스틱서치에서 조회 결과가 있다면 레디스에 검색결과 캐싱해두기
    await this.cacheManager.set(`products:${keyword}`, products, {
      ttl: 60,
    });

    //4. 최종 결과 브라우저에 리턴하기
    return products;
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
