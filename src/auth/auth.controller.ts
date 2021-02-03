import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserCreateDto, UserLoginDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) user: UserCreateDto): Promise<void> {
    return this.authService.createUser(user);
  }

  @Post('login')
  login(@Body(ValidationPipe) user: UserLoginDto): Promise<string> {
    return this.authService.login(user);
  }
}
