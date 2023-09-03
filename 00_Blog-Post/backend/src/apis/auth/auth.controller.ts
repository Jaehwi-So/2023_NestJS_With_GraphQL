import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/loginInput.dto';
import { IOAuthUser } from '../users/interface/user.req.auth';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserInput } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() input: LoginInput, @Res() res: Response) {
    const { email, password } = input;
    //1. 이메일, 비밀번호 일치 유저 찾기
    const user = await this.userService.findOne(email);

    //2. 일치하는 유저 없으면 에러
    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }

    //3. 일치하는 유저가 있지만 비밀번호 틀린경우 에러
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    }

    //4. 모두 일치 유저가 있다면 JWT Refresh Token 쿠키에 발급
    this.authService.setRefreshToken({ user, res });

    const jwt = this.authService.getAccessToken({ user });
    //5. 모두 일치 유저가 있다면 JWT Access Token 발급
    return res.status(200).send(jwt);
  }

  //리프레쉬 토큰으로 새로운 엑세스 토큰 발급
  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  restoreAccessToken(@Req() req: Request & IOAuthUser) {
    return this.authService.getAccessToken({ user: req.user });
  }

  @UseGuards(AuthGuard('google'))
  @Get('login/google')
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    console.log('찍힘?');
    //1. 가입확인
    let user = await this.userService.findOne(req.user.email);
    //2. 회원가입
    if (!user) {
      const input = {
        email: req.user.email,
        password: 'OAuth',
        name: req.user.name,
        age: 0,
      } as CreateUserInput;

      user = await this.userService.create(input);
    }
    //3. 로그인
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/09_Authorization/09-04-oauth/frontend/success.html',
    );
  }
}
