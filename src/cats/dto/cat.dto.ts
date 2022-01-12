import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  //picktype을 활용하면 스키마에서 필요한 부분만 가져올 수 있다.
  @ApiProperty({
    example: '1232',
    description: 'id',
    required: true,
  })
  id: string;
}
