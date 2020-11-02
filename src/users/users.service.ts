import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UserConfig } from 'src/utils/userConfig';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = (new UserConfig).getData();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}