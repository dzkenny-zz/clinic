import {User as JwtUser} from '@loopback/authentication-jwt';
import {model} from '@loopback/repository';

@model()
export class User extends JwtUser {
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
