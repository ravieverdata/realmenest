import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { AdminService } from 'src/services/admin/admin.service';
import { AdminController } from 'src/controllers/admin/admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
//import { jwtConstants } from 'test/config/config.schema';


// const jwtFactory = {
//     useFactory: async (jwtConstants: jwtConstants) => ({
//       secret: jwtConstants.secret,
//       signOptions: {
//         expiresIn: jwtConstants.exp,
//       },
//     }),
//     inject: [jwtConstants],
//   };

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.register({
        global: true,
        secret: 'Ed2112@21121998',
        signOptions: { expiresIn: '1d' },
      }),],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
