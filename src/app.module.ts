import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { typeOrmConfig } from './config/typeorm.config';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
