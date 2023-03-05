import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt/lib';

//PassportStrategy(인증 방식, 이름)
export class JwtRefreshStretagy extends PassportStrategy(Strategy, 'refresh') {
  //NestJS Docs
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }

  //검증 성공 시 실행, 실패 시는 에러
  // ### Passport는 validate에 성공할시 리턴값을 request.user에 저장함!!! ###
  validate(payload) {
    console.log(payload); //email, sub가 payload에 있음
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
