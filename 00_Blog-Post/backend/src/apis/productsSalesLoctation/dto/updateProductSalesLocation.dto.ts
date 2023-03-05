import { IsDate, IsDecimal, IsOptional, IsString } from 'class-validator';

//ID를 제외하고 InputType으로 사용
export class UpdateProductSalesLocationInput {
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressDetail: string;

  @IsDecimal()
  @IsOptional()
  lat: number; //위도

  @IsDecimal()
  @IsOptional()
  lng: number; //경도

  @IsDate()
  @IsOptional()
  meetingTime: Date;
}
