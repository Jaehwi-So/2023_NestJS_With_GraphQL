import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/createUser.dto';
import { IOAuthUser } from './interface/user.req.auth';

@Controller('user')
export class UserController {
  //
  PASSWORD_SALT = 10;
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      input.password,
      this.PASSWORD_SALT,
    );
    const user = {
      ...input,
      password: hashedPassword,
    };
    return this.userService.create(user);
  }

  // ### REST API에서는 여기까지만 하면 됨!!
  //@UseGuards(AuthGuard('myAuth'))
  @Get()
  selectUser(
    @Req() req: Request & IOAuthUser, // req.user를 GraphQL의 방식으로 변경해주는 커스텀 데코레이터 생성하여 사용
  ) {
    console.log('User Info', req.user);
    return 'qqq';
  }
}
