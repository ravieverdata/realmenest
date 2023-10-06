
import { TypeOrmModuleOptions} from '@nestjs/typeorm'
//import * as config from 'config'

//const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions={
   // name: 'primary',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'everdata_realme',
    //logging:true,
    cache: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
}



function parseBoolean(value: string | undefined): boolean | undefined {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined; // Return undefined if the value is not 'true' or 'false'
}
