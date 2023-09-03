import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20/lib';

//Google Strategy 사용
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_AUTH_CLIENT, //ID
      clientSecret: process.env.GOOGLE_AUTH_SECRET, //PWD
      callbackURL: 'http://localhost:3000/auth/login/google', //성공 시 URL
      scope: ['email', 'profile'], //성공시 받을 데이터
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken, refreshToken, profile);
    console.log('AccessToken ' + accessToken);
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
    };
  }
}
