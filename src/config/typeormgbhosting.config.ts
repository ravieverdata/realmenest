
import { TypeOrmModuleOptions} from '@nestjs/typeorm'
//import * as config from 'config'

//const dbConfig = config.get('db');

export const typeOrmConfigGbhosting: TypeOrmModuleOptions={
    name: 'Gbhosting',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'gbhosting',
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
}


export const typeOrmConfigGbhosting1: TypeOrmModuleOptions={
    name: process.env.GBHOSTINGDATABASE_NAME,
    type: 'mysql',
    host: process.env.GBHOSTINGDATABASE_HOST,
    port: parseInt(process.env.GBHOSTINGDATABASE_PORT, 10),
    username: process.env.GBHOSTINGDATABASE_USERNAME,
    password: process.env.GBHOSTINGDATABASE_PASSWORD,
    database: process.env.GBHOSTINGDATABASE_NAME,
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: parseBoolean(process.env.GBHOSTINGTypeorm_Sync),
}



function parseBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined; // Return undefined if the value is not 'true' or 'false'
}
