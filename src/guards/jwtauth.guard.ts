import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const excludedRoutes = ['/auth/signup', '/auth/login', '/doc', '/'];

    const request = context.switchToHttp().getRequest();

    const requestedRoute = request.path;
    if (excludedRoutes.includes(requestedRoute)) {
      return true;
    }

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];
    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      throw new ForbiddenException('Token verification failed');
    }
  }
}
