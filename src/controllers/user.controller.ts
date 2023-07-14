import {repository} from '@loopback/repository';
import {post, requestBody, response} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class SignupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/signup')
  @response(200, {
    description: 'User',
    content: {
      'application/json': {
        schema: {
          'x-ts-type': User,
        },
      },
    },
  })
  async signup(@requestBody() userData: User): Promise<User> {
    const savedUser = await this.userRepository.create(userData);
    return savedUser;
  }
}
