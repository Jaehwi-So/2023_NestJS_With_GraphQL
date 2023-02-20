import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy, ExtractJwt } from 'passport-jwt';

//PassportStrategy(인증 방식, 이름)
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  //NestJS Docs
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      //   jwtFromRequest: (req) => {
      //     원래 이 안에서 Request에서 무엇을 가져올 지 적어줘야 한다. Bearer 문자열 분리도 하는데 아래 메서드가 대신 해줌
      //   },

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Request Header에서 Bearer auth 뽑아내기
      secretOrKey: 'myAccessKey',
      passReqToCallback: true, //request를 validate에 함께 넘겨주는 옵션s
    });
  }

  //검증 성공 시 실행, 실패 시는 에러
  // ### Passport는 validate에 성공할시 리턴값을 request.user에 저장함!!! ###
  async validate(req, payload) {
    const authorization = req.headers.authorization;
    const accessToken = authorization
      .replace('Bearer ', '')
      .replace('bearer ', '');

    //Redis에 Logout Cacheing이 되어있다면 유효하지 않은 토큰
    const isExpire = await this.cacheManager.get(
      `accTokenExpired-${accessToken}`,
    );
    if (isExpire) {
      throw new UnauthorizedException();
    }
    console.log(payload); //email, sub가 payload에 있음
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
