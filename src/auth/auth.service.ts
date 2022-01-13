import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}
  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    //해당하는 이메일이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }
    // password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요');
    }
    const payload = { email: email, sub: cat.id }; // sub는 토큰제목
    return {
      token: this.jwtService.sign(payload), // sign함수를 이용해서 토큰을 만들어서 프론트로 보내준다.
    };
  }
}
