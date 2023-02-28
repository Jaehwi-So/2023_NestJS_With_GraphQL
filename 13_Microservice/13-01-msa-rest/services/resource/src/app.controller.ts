import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'resourceGetBoards' })
  fetchBoards(data) {
    console.log(data);
    return '게시글 데이터 보내주기' + data.text;
  }
}
