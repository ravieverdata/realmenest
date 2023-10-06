export default () => ({
    //port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.PRIMARYDATABASE_HOST,
        port: parseInt(process.env.PRIMARYDATABASE_PORT, 10) || 5432,
        type: 'mysql',
        username: process.env.PRIMARYDATABASE_USERNAME,
        password: '',
        database: process.env.PRIMARYDATABASE_NAME,
        //logging:true,
        cache: true,
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
    }
  });
  