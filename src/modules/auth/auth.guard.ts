import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@/utils/handleJwt';
import User from '@/modules/wallapop/models/User.model';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    try {
      if (!request.headers.authorization) {
        throw new UnauthorizedException('ERROR_AUTHENTICATION: Missing authorization header.');
      }

      const token = request.headers.authorization.split(' ').pop();
      if (!token) {
        throw new UnauthorizedException('ERROR_TOKEN: No token provided.');
      }

      const dataToken = await verifyToken(token);
      if (!dataToken) {
        throw new UnauthorizedException('ERROR_TOKEN: The token is invalid or has expired.');
      }

      const user = await User.findOne({ _id: dataToken._id });
      if (!user) {
        throw new UnauthorizedException('ERROR_USER: No user associated with the provided token was found.');
      }

      request.user = dataToken;
      return true;
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw e;
      }
      throw new UnauthorizedException('ERROR_SESSION: Issue processing the session, possible server error or malformed token.');
    }
  }
}