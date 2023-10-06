
import { TypeOrmModuleOptions} from '@nestjs/typeorm'
//import * as config from 'config'

//const dbConfig = config.get('db');

export const typeOrmConfigHosting: TypeOrmModuleOptions={
    name: 'Hosting',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hosting',
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
}



// export const typeOrmConfigHosting1: TypeOrmModuleOptions={
//     name: process.env.HOSTINGDATABASE_NAME,
//     type: 'mysql',
//     host: process.env.HOSTINGDATABASE_HOST,
//     port: parseInt(process.env.HOSTINGDATABASE_PORT, 10),
//     username: process.env.HOSTINGDATABASE_USERNAME,
//     password: process.env.HOSTINGDATABASE_PASSWORD,
//     database: process.env.HOSTINGDATABASE_NAME,
//     //logging:true,
//     cache: true,
//     entities: ["dist/**/*.entity{.ts,.js}"],
//     synchronize: parseBoolean(process.env.HOSTINGTypeorm_Sync),
// }



function parseBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined; // Return undefined if the value is not 'true' or 'false'
}
