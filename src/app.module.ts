import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'everdata_realme',
      //logging: true,
      //entities: [],
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
