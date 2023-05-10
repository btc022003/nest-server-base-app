import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, QueryInfo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/api/base/base.controller';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/api/v1/admin/users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @ApiOperation({
    summary: '分页形式获取列表数据',
  })
  @Get()
  index(@Query() query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};
    if (query.name) {
      where.name = {
        OR: {
          userName: {
            contains: query.name,
          },
          nickName: {
            contains: query.name,
          },
          realName: {
            contains: query.name,
          },
        },
      };
    }

    return this.usersService.findAll(where, page, per);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
