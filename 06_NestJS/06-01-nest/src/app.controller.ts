import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    //private readonly로 다음 생략
    //this.appService = appService
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
