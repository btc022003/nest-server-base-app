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
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, QueryInfo } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { BaseController } from 'src/api/base/base.controller';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/api/v1/admin/activities')
export class ActivitiesController extends BaseController {
  constructor(private readonly activitiesService: ActivitiesService) {
    super(activitiesService);
  }

  @ApiOperation({
    summary: '分页形式获取列表数据',
  })
  @Get()
  index(@Query() query: QueryInfo) {
    const { page, per } = query;
    const where: any = {};
    if (query.name) {
      where.name = { contains: query.name };
    }
    return this.activitiesService.findAll(where, page, per);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  create(@Body() createArticleDto: CreateActivityDto) {
    return this.activitiesService.create(createArticleDto);
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateActivityDto) {
    return this.activitiesService.update(id, updateArticleDto);
  }
}
