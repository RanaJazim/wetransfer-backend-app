import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Auth } from './auth.entity';
import { UserCreateDto, UserDto, UserLoginDto } from './dtos';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  createUser(user: UserCreateDto): Promise<void> {
    return this.authRepository.createUser(user);
  }

  async login(user: UserLoginDto): Promise<UserDto> {
    return this.authRepository.login(user);
  }
}
