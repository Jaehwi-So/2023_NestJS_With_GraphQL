import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}
@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Get('auth/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    try {
      //1. 가입확인
      let user = await this.userService.findOne({ email: req.user.email });
      //2. 회원가입
      if (!user) {
        user = await this.userService.create({
          email: req.user.email,
          hashedPassword: req.user.password,
          name: req.user.name,
          age: req.user.age,
        });
      }
      //3. 로그인
      this.authService.setRefreshToken({ user, res });
      res.redirect(
        'http://localhost:5500/09_Authorization/09-04-oauth/frontend/social-login.html',
      );

      console.log('Success');
    } catch (e) {
      console.log(e);
    }
  }
}
