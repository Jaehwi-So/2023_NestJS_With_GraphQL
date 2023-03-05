import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  //N(상품): M(상품태그) 엔터티 연결, Product가 나를 찾을 때 찾을 방법을 무명 함수로 인자 넣음
  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}
