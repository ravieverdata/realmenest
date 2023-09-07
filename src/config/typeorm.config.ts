
import { TypeOrmModuleOptions} from '@nestjs/typeorm'
//import * as config from 'config'

//const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions={
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: 'root',
    password: '',
    database: 'everdata_realme',
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: parseBoolean(process.env.Typeorm_Sync),
}



function parseBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined; // Return undefined if the value is not 'true' or 'false'
}
