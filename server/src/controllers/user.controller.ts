// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { TokenService } from '@loopback/authentication';
import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { model, property, repository } from '@loopback/repository';
import { getModelSchemaRef, post, requestBody } from '@loopback/rest';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import _ from 'lodash';
import { User, Response } from '../models';
import { Clinic } from '../models/clinic.model';
import { ClinicRepository, UserRepository } from '../repositories';
import { UserService, verifyNewUser } from '../services/user.service';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string'
  })
  name: string;

  @property({
    type: 'string'
  })
  phone: string;

  @property({
    type: 'string'
  })
  address: string;
}

const CredentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @repository(UserRepository)
    protected userRepository: UserRepository,
    @repository(ClinicRepository)
    protected clinicRepository: ClinicRepository
  ) { }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<Response> {
    // check credentials first
    let userProfile;
    try {
      // ensure the user exists, and the password is correct
      const user = await this.userService.verifyCredentials(credentials);

      // convert a User object into a UserProfile object (reduced set of properties)
      userProfile = this.userService.convertToUserProfile(user);
    } catch (error) {
      // 401 = invalid username and password
      if (error.status === 401) {
        return new Response({
          code: 401,
          message: 'Invalid email or password.'
        });
      } 
      // unknow error, redirect error
      else {
        return new Response({
          code: error.status,
          message: error.message
        });
      }
    }

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    // get clinic information when login
    const clinic = await this.clinicRepository.findOne({
      where: { id: userProfile.id }
    });

    if (!clinic) {
      return new Response({
        code: 500,
        message: 'no clinic information found'
      });
    }

    return new Response({
      code: 200,
      payload: {
        token,
        clinic: _.assign({}, clinic, { email: userProfile.email })
      }
    });
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<Response> {
    // validate new user data
    const validate = verifyNewUser(newUserRequest);
    console.log(validate);
    if (!validate) {
      return new Response({
        code: 304,
        message: 'Incorrect data'
      });
    }

    // encrypt password
    const password = await hash(newUserRequest.password, await genSalt());

    //create user
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, ['password', 'name', 'phone', 'address'])
    );

    // create user credentials record
    const savedCredentials = await this.userRepository.userCredentials(savedUser.id).create({ password });

    // generate token
    const userProfile = this.userService.convertToUserProfile(savedUser);
    const token = await this.jwtService.generateToken(userProfile);

    // create clinic information
    const clinic = new Clinic({
      id: savedUser.id,
      name: newUserRequest.name,
      phone: newUserRequest.phone,
      address: newUserRequest.address
    });

    // create clinic record
    const savedClinic = await this.clinicRepository.create(clinic);

    return new Response({
      code: 201,
      payload: {
        user: savedUser,
        token,
        clinic: _.assign({}, savedClinic, { email: savedUser.email })
      }
    });
  }
}
