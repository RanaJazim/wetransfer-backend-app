import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity()
@Unique(['email'])
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  async hashPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }

  async isPasswordMatch(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async generateToken(): Promise<string> {
    const privateKey = 'mykey';

    return jwt.sign(
      {
        id: this.id,
        username: this.username,
        email: this.email,
      },
      privateKey,
    );
  }
}
