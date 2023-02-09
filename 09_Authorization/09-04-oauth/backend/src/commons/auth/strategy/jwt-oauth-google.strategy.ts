import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

//Google Strategy 사용
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'id', //ID
      clientSecret: 'secret', //PWD
      callbackURL: 'http://localhost:3000/login/google', //성공 시 URL
      scope: ['email', 'profile'], //성공시 받을 데이터
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(profile);
    return {
      email: profile.emails[0].value,
      password: 'xxxxxxxx',
      name: profile.displayName,
      age: 0,
    };
  }
}
