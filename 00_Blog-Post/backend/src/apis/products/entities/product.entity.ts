import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLoctation/entities/productSalesLocation.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: 'ID' })
  id: number;

  @Column()
  @ApiProperty({ description: '이름' })
  name: string;

  @Column({ type: 'longtext' })
  @ApiProperty({ description: '설명' })
  description: string;

  @Column()
  @ApiProperty({ description: '가격' })
  price: number;

  @Column({ default: false })
  @ApiProperty({ description: '판매여부' })
  isSoldOut: boolean;

  @DeleteDateColumn() //TypeORM 제공 삭제여부 타임스탬프
  @ApiProperty({ description: '삭제시간' })
  deletedAt: Date;

  @UpdateDateColumn() //TypeORM 제공 삭제여부 타임스탬프
  @ApiProperty({ description: '수정시간' })
  updatedAt: Date;

  //1:1 엔터티 연결
  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  @ApiProperty({ description: '상품거래장소' })
  productSalesLocation: ProductSalesLocation;

  //N(상품): 1(카테고리) 엔터티 연결
  //Many 부분에 해당하는 테이블에서는 JoinColumn 생략 가능
  @ManyToOne(() => ProductCategory)
  @ApiProperty({ description: '카테고리' })
  productCategory: ProductCategory;

  //N(상품): 1(유저) 엔터티 연결
  @ManyToOne(() => User)
  @ApiProperty({ description: '등록유저' })
  user: User;

  //N(상품): M(상품태그) 엔터티 연결, ProductTags가 나를 찾을 때 인식하는 방법을 무명 함수로 인자 넣음
  //JoinTable은 N:M 관계의 중간 테이블을 자동 생성해주며, 기준 테이블 한쪽에만 작성하면 됨
  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @ApiProperty({ description: '상품태그' })
  productTags: ProductTag[];
}
