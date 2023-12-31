// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import _ from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';
import {BcryptHasher} from '../services/hash.password.bcrypt';
import {validateCredentials} from '../services/validator';

// import {inject} from '@loopback/core';
export class AdminController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.hasher')
    public hasher: BcryptHasher,
  ) {}

  @post('/admin', {
    responses: {
      '200': {
        description: 'Admin',
        content: {
          schema: getJsonSchemaRef(User),
        },
      },
    },
  })
  async create(@requestBody() admin: User) {
    validateCredentials(_.pick(admin, ['email', 'password']));
    admin.permissions = [
      PermissionKeys.CreateJob,
      PermissionKeys.UpdateJob,
      PermissionKeys.DeleteJob,
    ];
    //encrypt the user password
    // eslint-disable-next-line require-atomic-updates
    admin.password = await this.hasher.hashPassword(admin.password);

    const savedAdmin = await this.userRepository.create(admin);
    const savedAdminData = _.omit(savedAdmin, 'password');
    return savedAdminData;
  }
}
