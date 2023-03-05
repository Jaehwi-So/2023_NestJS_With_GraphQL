import { IsDate, IsDecimal, IsString } from 'class-validator';

//ID를 제외하고 InputType으로 사용
export class CreateProductSalesLocationInput {
  @IsString()
  address: string;
  @IsString()
  addressDetail: string;
  @IsDecimal()
  lat: number; //위도
  @IsDecimal()
  lng: number; //경도
  @IsDate()
  meetingTime: Date;
}
