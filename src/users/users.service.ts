import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    const password = '123456789';
    const hash = bcrypt.hash(password, 10);
    this.users = [
      {
        userId: 1,
        username: 'admin',
        password: hash,
        level:1,
      },
      {
        userId: 2,
        username: 'thanh',
        password: hash,
        level: 2,
      },
      {
        userId: 3,
        username: 'test',
        password: hash,
        level: 2,
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}