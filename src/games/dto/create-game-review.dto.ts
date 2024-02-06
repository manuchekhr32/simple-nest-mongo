import { ApiProperty } from '@nestjs/swagger';

export class CreateGameReviewDto {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  userId: string;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  gameId: string;

  @ApiProperty({
    required: true,
    nullable: false,
    minimum: 1,
    maximum: 5,
  })
  rate: number;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  comment: string;
}
