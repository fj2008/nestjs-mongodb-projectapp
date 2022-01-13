import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatsRepository } from 'src/cats/cats.repository';
import { payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, //유출되면 안되기때문에 환경변수로 설정
      ignoreExpiration: false,
    });
  }
  //jwt가 날라왔을때 payload를 뽑아냈다면 유효성체크하는 함수
  async validate(payload: payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat; //request.user안에 객체가 찍힌다.
    } else {
      throw new UnauthorizedException('접근오류');
    }
  }
}
