import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from 'src/modules/admin/admin.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        private jwtService: JwtService
      ) {}

    private users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ];

    findAll(): any[] {
        return this.users;
    }

    // findById(id: number): any {
        // return this.users.find(user => user.id === id);
    // }

    async getAllUsers(): Promise<AdminEntity[]> {
        return await this.adminRepository.find();
    }

    async getuser(id: number): Promise<AdminEntity> {
        console.log('hello', id);
        const admin = await this.adminRepository.findOneBy({ id });
        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }
        return admin;
    }


    async login(un: string, ps: string): Promise<any> {
        const admin = await this.adminRepository.findOneBy({ un });
        if (!admin) {
            throw new NotFoundException(`Admin with Un ${un} not found`);
        }

        const md5 = crypto.createHash('md5').update(ps).digest("hex");

        if (admin?.ps !== md5) {
            throw new UnauthorizedException();
        }
        const payload = { id: admin.id, un: admin.un, phone: admin.ph, email: admin.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
        
    }

    async insert(user: any) {
        return await this.adminRepository.insert(user);
    }

    async logTableData() {
        try {
          const allData = await this.adminRepository.find();
          console.log('All table data:', allData);
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
    }

}
