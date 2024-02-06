import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  url: string;
}
