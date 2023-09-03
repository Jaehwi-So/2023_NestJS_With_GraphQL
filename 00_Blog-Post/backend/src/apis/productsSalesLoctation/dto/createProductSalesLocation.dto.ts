import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsString } from 'class-validator';

//ID를 제외하고 InputType으로 사용
export class CreateProductSalesLocationInput {
  @ApiProperty({ description: '이름' })
  @IsString()
  address: string;

  @ApiProperty({ description: '상세 주소' })
  @IsString()
  addressDetail: string;

  @ApiProperty({ description: '위도' })
  @IsDecimal()
  lat: number; //위도

  @ApiProperty({ description: '경도' })
  @IsDecimal()
  lng: number; //경도

  @ApiProperty({ description: '거래시간' })
  @IsDate()
  meetingTime: Date;
}
