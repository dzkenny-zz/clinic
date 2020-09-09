import { UserService as JwtUserService } from '@loopback/authentication';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare } from 'bcryptjs';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { NewUserRequest } from '../controllers';
import * as _ from 'lodash';
import { validateEmail, validatePhone } from './validate.service';

export type Credentials = {
  email: string;
  password: string;
};

export class UserService implements JwtUserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) { }

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';

    // found user by email
    const foundUser = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    // find credentials by email
    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    // check password
    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
    };
  }
}

export function verifyNewUser(user: NewUserRequest): boolean {
  const { email, password, phone, name, address } = user;

  if (!email || !password || !phone || !name || !address) {
    return false;
  }

  if (_.size(password) < 8) {
    return false;
  }

  if (!validateEmail(email)) {
    return false;
  }

  if (!validatePhone(phone)) {
    return false;
  }

  return true;
}
