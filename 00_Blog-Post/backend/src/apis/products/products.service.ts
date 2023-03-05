import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import {
  InjectConnection,
  InjectDataSource,
  InjectRepository,
} from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Connection, LessThan, Like, Repository } from 'typeorm';
import { ProductSalesLocation } from '../productsSalesLoctation/entities/productSalesLocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('Product');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationRepository: Repository<ProductSalesLocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,

    private readonly connection: Connection, //Typeorm 지원
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      input;
    const queryRunner = await this.connection.createQueryRunner();
    try {
      // T. 트랜잭션 사용을 위해서 queryRunner 연결
      await queryRunner.connect();
      // T. 트랜잭션 시작
      await queryRunner.startTransaction();

      //위치 저장
      const location = await this.productSalesLocationRepository.create({
        ...productSalesLocation,
      });

      await queryRunner.manager.save(location);

      //태그 등록
      const productTagList = await Promise.all(
        productTags.map((el) => {
          return new Promise(async (resolve, reject) => {
            const tagName = el.replace('#', '');

            const existTag = await queryRunner.manager
              .createQueryBuilder(ProductTag, 'pt')
              .where('pt.name = :name', { name: tagName })
              .getOne();

            if (existTag) {
              resolve(existTag);
            } else {
              const newTag = await this.productTagRepository.create({
                name: tagName,
              });
              await queryRunner.manager.save(newTag);
              resolve(newTag);
            }
          });
        }),
      );

      const products = await this.productRepository.create({
        ...product,
        productSalesLocation: location,
        productCategory: {
          id: productCategoryId,
        },
        productTags: productTagList,
      });

      const result = await queryRunner.manager.save(products);

      // T. 트랜잭션 커밋
      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      // T. 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      // T. queryRunner 연결 종료
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Product[]> {
    //const res = await this.boardRepository.find({});
    const result = await this.productRepository.find({
      relations: ['productCategory', 'productTags', 'productSalesLocation'],
    });
    this.logger.log('Select Products');
    return result;
  }
  async findOne(id: number): Promise<Product> {
    const result = await this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.productCategory', 'pc')
      .leftJoinAndSelect('p.productTags', 'pt')
      .leftJoinAndSelect('p.productSalesLocation', 'psl')
      .where('p.id = :id', { id: id })
      .getOne();
    return result;
  }

  async modify(input: UpdateProductInput): Promise<Product> {
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      input;

    const exist = await this.productRepository.findOne({
      where: { id: product.id },
      relations: ['productSalesLocation', 'productCategory'],
    });

    //위치 갱신
    const location = await this.productSalesLocationRepository.save({
      ...productSalesLocation,
      id: exist.productSalesLocation.id,
    });

    //태그 등록 / productTags ["#전자제품", "#컴퓨터"]
    const productTagList = await Promise.all(
      productTags.map((el) => {
        return new Promise(async (resolve, reject) => {
          const tagName = el.replace('#', '');
          const existTag = await this.productTagRepository.findOne({
            name: tagName,
          });
          if (existTag) {
            resolve(existTag);
          } else {
            const newTag = await this.productTagRepository.save({
              name: tagName,
            });
            resolve(newTag);
          }
        });
      }),
    );

    const newProduct = await this.productRepository.save({
      ...exist,
      ...product,
      productSalesLocation: location,
      productCategory: {
        id: productCategoryId,
      },
      productTags: productTagList,
    });

    const result = await this.productRepository.save(newProduct);
    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.productRepository.softDelete({ id: id });
    return result.affected ? true : false; //행이 영향을 받았는지 확인
  }
}

//

// async create(input: CreateProductInput): Promise<Product> {
//   const { productSalesLocation, productCategoryId, productTags, ...product } =
//     input;

//   // T. 트랜잭션 사용을 위해서 queryRunner 연결
//   const queryRunner = await this.connection.createQueryRunner();
//   await queryRunner.connect();
//   // T. 트랜잭션 시작
//   await queryRunner.startTransaction('REPEATABLE READ');

//   //위치 저장
//   const location = await this.productSalesLocationRepository.save({
//     ...productSalesLocation,
//   });

//   //태그 등록 / productTags ["#전자제품", "#컴퓨터"]
//   const productTagList = await Promise.all(
//     productTags.map((el) => {
//       return new Promise(async (resolve, reject) => {
//         const tagName = el.replace('#', '');
//         const existTag = await this.productTagRepository.findOne({
//           name: tagName,
//         });
//         if (existTag) {
//           resolve(existTag);
//         } else {
//           const newTag = await this.productTagRepository.save({
//             name: tagName,
//           });
//           resolve(newTag);
//         }
//       });
//     }),
//   );

//   const result = await this.productRepository.save({
//     ...product,
//     productSalesLocation: location,
//     productCategory: {
//       id: productCategoryId,
//     },
//     productTags: productTagList,
//   });
//   return result;
// }
