import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AccesstokenguardGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      const payload =  await this.jwtService.verifyAsync(
        token,
        {
          secret: 'Ed2112@2112199863899391gddjgjgjbjdg'
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;

      console.log(payload.tokentype, "testing");

      const isValid = this.verifyAccessToken(payload.tokentype);

      return isValid;

    } catch {
      throw new UnauthorizedException();
    }

  }

  private verifyAccessToken(payload: string): boolean {

    if(payload === 'otp'){
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  
}
