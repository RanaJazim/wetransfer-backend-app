import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-auth-token'] || req.headers['authorization'];

    if (!token) throw new BadRequestException('Token not provided');

    try {
      const decoded = jwt.verify(token, 'mykey');
      req['user'] = decoded;
    } catch (ex) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
