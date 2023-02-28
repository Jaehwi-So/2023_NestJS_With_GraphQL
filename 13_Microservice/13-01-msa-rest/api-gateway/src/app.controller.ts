import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy, //
    @Inject('RESOURCE_SERVICE')
    private readonly clientResoucreService: ClientProxy,
  ) {}

  @Get('/auth/login')
  login() {
    return this.clientAuthService.send(
      {
        cmd: 'authGetAuthLogin',
      },
      {
        text: 'Hello Auth',
      },
    );
  }

  @Get('/boards')
  fetchBoards() {
    return this.clientResoucreService.send(
      {
        cmd: 'resourceGetBoards',
      },
      {
        text: 'Hello Board',
      },
    );
  }
}
