import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegerType, Repository, MoreThanOrEqual } from 'typeorm';
import { AdminEntity } from 'src/modules/admin/admin.entity';
import { AdminLoginHistoryEntity } from 'src/modules/admin/adminloginhistory.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { GenerateOtpNumber } from 'src/shared/utility/generate-otp.utility';
import { InvalidOtpException } from 'src/shared/customexception/InvalidOtpException';


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        @InjectRepository(AdminLoginHistoryEntity)
        private readonly adminLoginHistoryEntity: Repository<AdminLoginHistoryEntity>,
        private jwtService: JwtService,
       // private readonly req: Request // Inject Request
        //private readonly secretKey = '31gkgae9hi2ykg3uuig7i2u'
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


    async login(un: string, ps: string, ip:string): Promise<any> {

        // check admin data 
        const admin = await this.adminRepository.findOneBy({ un });
        if (!admin) {
            throw new NotFoundException(`Admin with Un ${un} not found`);
        }

        const md5 = crypto.createHash('md5').update(ps).digest("hex");

        if (admin?.ps !== md5) {
            throw new UnauthorizedException('Password is Incorrect');
        }

        // check all last login history of user
        const loginhistoryupdate = await this.adminLoginHistoryEntity.find({
            where: [
              {
                unid: admin.id,
                sessionstatus: 'Active', // First "OR" condition
              },
              {
                unid: admin.id,
                sessionstatus: 'Pending', // Second "OR" condition
              },
            ],
        });

        // logout all last data 

        if (loginhistoryupdate.length > 0) {
            // Iterate through the array and update the 'status' property for each entity
            for (const entity of loginhistoryupdate) {
              entity.sessionstatus = 'Logout';
            }

            // Save the changes to the database
            await this.adminLoginHistoryEntity.save(loginhistoryupdate);
        } else {
        // Handle the case when no records are found
            console.log('No records found.');
        }
        
        let generateOtp = GenerateOtpNumber.generateOtp();

        // generate new request for otp
        // update otp value in database
        const otp = new AdminLoginHistoryEntity();
        otp.unid = admin.id;
        otp.userid = admin.un;
        otp.ip = ip;
        otp.status = 'Success';
        otp.sessionstatus = 'Pending';
        otp.otp = generateOtp;
        await this.adminLoginHistoryEntity.save(otp);

        // GenerateOtpNumber. access token for otp only for 10 min.
        

        const payload = { id: admin.id, un: admin.un, tokentype: 'otp' };

        try {
            const otpToken = await this.jwtService.signAsync(payload, { expiresIn: '10m' });
            return {
                access_token: otpToken,
                otp: true,
            };

        } catch (error) {
            // Handle any errors here
            console.error('Error generating OTP token:', error);
            throw new BadRequestException('Invalid request data');
        }
        
    }


    async otpverify(otp: string, ip: string, request: Request): Promise<{ accessToken: string,  success: boolean}> {

        const user = request['user'];

        // check in admin

        const admincheck = await this.adminRepository.findOne({
            where: [
              {
                id: user.id,
                un: user.un, // First "OR" condition
              },
            ],
        });

        if (!admincheck) {
            throw new BadRequestException('Invalid request data');
        }

        // check in otphistory tabel
        const tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

        const adminotpcheck = await this.adminLoginHistoryEntity.findOne({
            where: [
              {
                unid: user.id,
                userid: user.un, 
                ip: ip, 
                sessionstatus: 'Pending', 
                otp: otp,
                dt: MoreThanOrEqual(tenMinutesAgo),  
              },
            ],
            order: {
                id: "DESC",
            },
        });

        if(!adminotpcheck){
            throw new InvalidOtpException();
        }

        // succeess update in otptable
        adminotpcheck.sessionstatus = 'Active';
        await this.adminLoginHistoryEntity.save(adminotpcheck);

        // console.log(user); // Access token values here
        // console.log(adminotpcheck, "hdhdhddhdh"); // Access token values here

        // generate the final token for access the application

        const payload = { id: admincheck.id, un: admincheck.un, phone: admincheck.ph, email: admincheck.email, tokentype: 'login' };

        try {
            const otpToken = await this.jwtService.signAsync(payload, { expiresIn: '1d' });
            return {
                accessToken: otpToken,
                success: true,
            };

        } catch (error) {
            // Handle any errors here
            console.error('Error generating OTP token:', error);
            throw new BadRequestException('Invalid request data.');
        }
        
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
