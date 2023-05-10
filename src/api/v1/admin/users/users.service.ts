import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/api/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.user);
  }

  /**
   * 新增一条记录
   * @param data
   * @returns
   */
  async create(data) {
    const u = await this.prisma.user.findFirst({
      where: {
        userName: data.userName,
      },
    });
    if (u) {
      return {
        success: false,
        errorMessage: '用户信息已经存在',
      };
    } else {
      await this.model.create({
        data,
      });
      return '创建成功';
    }
  }
}
