import { BadRequestException, ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Auth } from './auth.entity';
import { UserCreateDto, UserDto, UserLoginDto } from './dtos';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  async createUser(uesrCredentials: UserCreateDto): Promise<void> {
    const { username, email, password } = uesrCredentials;

    const user = new Auth();
    user.username = username;
    user.email = email;
    await user.hashPassword(password);

    try {
      await user.save();
    } catch (err) {
      if (err.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Email is already exist');
      }

      throw err;
    }
  }

  async login(user: UserLoginDto): Promise<UserDto> {
    const { email, password } = user;

    const userInDb = await this.findOne({ where: { email } });

    if (!userInDb || !(await userInDb.isPasswordMatch(password)))
      throw new BadRequestException("Credentials doen't match");

    return { ...userInDb, token: await userInDb.generateToken() };
  }
}
