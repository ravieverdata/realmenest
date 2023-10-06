import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VerifyserviceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    const decodedName = Buffer.from(req.header('Connverification'), 'base64').toString('utf-8');
    const value = decodedName.toUpperCase();

    if(value === process.env.EVERDATACONNECTION_NAME){
      req['microhost'] = process.env.EVERDATADATABASE_HOSTURL;
    } else if(value === process.env.GBHOSTINGDATABASE_NAME){
      req['microhost'] = process.env.GBHOSTINGDATABASE_HOSTURL;
    } else if(value === process.env.HOSTINGDATABASE_NAME){
      req['microhost'] = process.env.HOSTINGDATABASE_HOSTURL;
    }else{
      throw new BadRequestException('Configuration Error For this Request');
      //throw new Error('Configuration Error For this Request');
    }

    next();
  }
}
