import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  username: string;

  @ApiProperty({
    required: false,
  })
  age?: number;

  @ApiProperty({
    required: false,
  })
  skills?: string[];
}
