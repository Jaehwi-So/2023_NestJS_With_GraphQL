import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, //DB Connection 객체, Generic을 지정해주어야함
  ) {}

  async create({ input }) {
    const result = await this.productRepository.save({
      ...input,
      // name: input.name,
      // description: input.description,
      // price: input.price,
    });
    return result;
  }

  async findAll() {
    const result = await this.productRepository.find();
    return result;
  }

  async findOne({ id }) {
    const result = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  async update({ id, input }) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });

    const newProduct = {
      ...product, //기존 Object
      id: id, //해당 id에 해당하는 것을 찾는 where임.
      ...input, //해당 부분 갱신.
    };
    const result = await this.productRepository.save(newProduct); //해당 PK를 찾아 알아서 갱신해줌.
    return result; //graphQL result 객체에 모든 요소를 반환하려면 새로운 완전한 객체를 생성하여 저장하는 형식으로
  }

  async checkSoldOut({ id }) {
    const product = await this.productRepository.findOne({
      where: { id: id },
    });
    if (product.isSoldOut) {
      // throw new HttpException(
      //   '이미 판매 완료된 상품입니다.',
      //   HttpStatus.UNPROCESSABLE_ENTITY,
      // );
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  //1. 실제 삭제
  async deleteHard({ id }) {
    const result = await this.productRepository.delete({ id: id });
    return result.affected ? true : false; //행이 영향을 받았는지 확인
  }

  // //2. 소프트 삭제(IsDeleted Boolean)
  // async deleteSoftIsDeleted({ id }) {
  //   this.productRepository.update({ id: id }, { deletedAt: true });
  // }

  //3. 소프트 삭제(Timestamp 이용)
  async deleteSoftTimeStamp({ id }) {
    const result = await this.productRepository.update(
      { id: id },
      { deletedAt: new Date() },
    );
    return result.affected ? true : false; //행이 영향을 받았는지 확인
    //update와 save의 차이는 리턴값이 행에 영향을 주었다는 인포 오브젝트와, 세이브된 오브젝트를 반환하는것의 차이
  }

  // //4. TypeORM 제공 SoftRemove(ID로만 삭제가능)
  // async RemoveSoft({ id }) {
  //   this.productRepository.softRemove({ id: id });
  // }

  //5. TypeORM 제공 SoftDelete(다른 것으로 삭제 가능)
  async deleteSoft({ id }) {
    const result = await this.productRepository.softDelete({ id: id });
    return result.affected ? true : false; //행이 영향을 받았는지 확인
  }
}
