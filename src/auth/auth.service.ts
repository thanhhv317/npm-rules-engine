import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      let hashPassword = await user.password;
      const isPasswordMatching = await bcrypt.compare(pass, hashPassword);
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      userId: user.userId,
      level: user.level
    };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      level: user.level
    };
  }
}