
import { TypeOrmModuleOptions} from '@nestjs/typeorm'
//import * as config from 'config'

//const dbConfig = config.get('db');

export const typeOrmConfigEverdata: TypeOrmModuleOptions={
    name: 'Everdata',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'everdata',
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
}


export const typeOrmConfigEverdata1: TypeOrmModuleOptions={
    name: process.env.EVERDATADATABASE_NAME,
    type: 'mysql',
    host: process.env.EVERDATADATABASE_HOST,
    port: parseInt(process.env.EVERDATADATABASE_PORT, 10),
    username: process.env.EVERDATADATABASE_USERNAME,
    password: process.env.EVERDATADATABASE_PASSWORD,
    database: process.env.EVERDATADATABASE_NAME,
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: parseBoolean(process.env.EVERDATATypeorm_Sync),
}



function parseBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined; // Return undefined if the value is not 'true' or 'false'
}
