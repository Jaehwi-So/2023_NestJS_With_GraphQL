import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './apis/auth/auth.module';
import { FileModule } from './apis/file/file.module';
import { PaymentModule } from './apis/payment/payment.module';
import { ProductsModule } from './apis/products/products.module';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { UserModule } from './apis/users/user.module';
import { CommonModule } from './commons/common.module';
import { RequestMiddleware } from './commons/middleware/logger.middleware';

@Module({
  imports: [
    //use env
    ConfigModule.forRoot(),
    CommonModule,
    //ORM : Database Connection
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1111',
      database: 'my-database',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),

    ProductsModule,
    ProductCategoryModule,
    UserModule,
    AuthModule,
    PaymentModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
