import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '手机号',
  })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    description: '密码',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '名字',
  })
  @IsNotEmpty()
  realName: string;

  @ApiProperty({
    description: '性别',
  })
  gender: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '岗位',
  })
  station: string;

  @ApiProperty({
    description: '昵称',
  })
  nickName: string;
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
