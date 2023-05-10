import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    description: '名字',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '封面',
  })
  coverImage: string;

  @ApiProperty({
    description: '简介',
  })
  desc: string;

  @ApiProperty({
    description: '详情',
  })
  content: string;
}

export class QueryInfo {
  @ApiProperty({
    description: '关键词',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  page: number;

  @ApiProperty({
    description: '每页显示的数量',
    required: false,
    default: 10,
  })
  per: number;
}
