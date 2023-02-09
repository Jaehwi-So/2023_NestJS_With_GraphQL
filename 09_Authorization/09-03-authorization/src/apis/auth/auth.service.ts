import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    //주입받은 JWT Module의 서비스 이용
    private readonly jwtService: JwtService,
  ) {}

  //리프레쉬 토큰을 쿠키에 설정
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: 'myRefreshKey',
        expiresIn: '2w',
      },
    );
    //배포환경에서는 쿠키 보안옵션과 CORS 추가해주어야함
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }

  //Access Token 발급
  getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
      },
      {
        secret: 'myAccessKey',
        expiresIn: '20s',
      },
    );
  }
}
