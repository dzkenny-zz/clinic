import {UserService as JwtUserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {User} from '../models';
import {UserRepository} from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

export class UserService implements JwtUserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';
    console.log(1);
    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    console.log(2);
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    console.log(3);
    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    console.log(4);
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    console.log(5);
    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );
    console.log(6);
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
