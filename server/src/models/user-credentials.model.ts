import {UserCredentials as JwtUserCredentials} from '@loopback/authentication-jwt';
import {model} from '@loopback/repository';

@model()
export class UserCredentials extends JwtUserCredentials {

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
