import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard는 passport에서 스트레태지 클래스를 자동으로 실행해준다
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
