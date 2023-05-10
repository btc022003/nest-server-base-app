import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';
import { AllResponseInterceptor } from './all-response/all-response.interceptor';
import { AnyExceptionFilter } from './any-exception/any-exception.filter';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { encodePwd } from './utils/tools';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //
  });

  const config = new DocumentBuilder()
    .setTitle('通用接口')
    .setDescription('通用接服务器端API接口')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // localhost:3000/docs 访问接口文档

  app.enableCors({ origin: true, credentials: true }); // 允许跨域和传递cookie

  app.useGlobalInterceptors(new AllResponseInterceptor()); // 拦截格式化处理所有的服务器响应

  app.useGlobalPipes(new ValidationPipe()); // 使用验证插件

  app.use(cookieParser()); // cookie 格式化插件

  app.useGlobalFilters(new AnyExceptionFilter()); // 全局异常处理

  app.useStaticAssets('./public'); // 静态资源目录
  app.setBaseViewsDir('./src/views');
  app.setViewEngine('hbs');

  // 注册代码片段，在hbs模版中可以直接使用
  hbs.registerPartials('./src/views/partials', function (err) {
    if (err) console.log(err);
  });
  await app.listen(3000);
  const prisma = new PrismaService();
  const admin = await prisma.manager.upsert({
    where: {
      userName: 'admin',
    },
    update: {
      password: encodePwd('admin'),
    },
    create: {
      userName: 'admin',
      password: encodePwd('admin'),
    },
  });
  console.log(admin);
  console.log('数据初始化完成');
}
bootstrap();
