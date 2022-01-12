import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1234', //유출되면 안되기때문에 환경변수로 설정
      ignoreExpiration: false,
    });
  }
  //jwt가 날라왔을때 payload를 뽑아냈다면 유효성체크하는 함수
  //   async validate(payload) {}
}
