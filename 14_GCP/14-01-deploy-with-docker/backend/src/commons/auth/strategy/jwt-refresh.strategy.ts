import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

//PassportStrategy(인증 방식, 이름)
export class JwtRefreshStretagy extends PassportStrategy(Strategy, 'refresh') {
  //NestJS Docs
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     원래 이 안에서 Request에서 무엇을 가져올 지 적어줘야 한다. Bearer 문자열 분리도 하는데 아래 메서드가 대신 해줌
      //   },

      jwtFromRequest: (req) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      secretOrKey: 'myRefreshKey',
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
