import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    default: '0',
  })
  offset?: string;

  @ApiProperty({
    required: false,
    default: '10',
  })
  limit?: string;
}
