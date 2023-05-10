import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonController } from './api/v1/common/common.controller';
import { ValidateLoginMiddleware } from './validate-login/validate-login.middleware';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './api/v1/auth/auth.module';
import { CommonService } from './api/v1/common/common.service';
import { UsersModule } from './api/v1/admin/users/users.module';
import { ActivitiesModule } from './api/v1/admin/activities/activities.module';

@Module({
  imports: [AuthModule, UsersModule, ActivitiesModule],
  controllers: [AppController, CommonController],
  providers: [AppService, PrismaService, CommonService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateLoginMiddleware)
      .forRoutes(...['/api/v1/admin/*', '/api/v1/members/*']); // 使用中间件
  }
}
