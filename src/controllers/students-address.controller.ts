import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Address,
  Students,
} from '../models';
import {StudentsRepository} from '../repositories';

export class StudentsAddressController {
  constructor(
    @repository(StudentsRepository) protected studentsRepository: StudentsRepository,
  ) { }

  @get('/students/{id}/address', {
    responses: {
      '200': {
        description: 'Students has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.studentsRepository.address(id).get(filter);
  }

  @post('/students/{id}/address', {
    responses: {
      '200': {
        description: 'Students model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Students.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInStudents',
            exclude: ['id'],
            optional: ['studentsId']
          }),
        },
      },
    }) address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.studentsRepository.address(id).create(address);
  }

  @patch('/students/{id}/address', {
    responses: {
      '200': {
        description: 'Students.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.studentsRepository.address(id).patch(address, where);
  }

  @del('/students/{id}/address', {
    responses: {
      '200': {
        description: 'Students.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.studentsRepository.address(id).delete(where);
  }
}
