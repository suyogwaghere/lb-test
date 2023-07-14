import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Enrollment} from '../models';
import {EnrollmentRepository} from '../repositories';

export class EnrollmentController {
  constructor(
    @repository(EnrollmentRepository)
    public enrollmentRepository : EnrollmentRepository,
  ) {}

  @post('/enrollments')
  @response(200, {
    description: 'Enrollment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Enrollment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enrollment, {
            title: 'NewEnrollment',
            exclude: ['id'],
          }),
        },
      },
    })
    enrollment: Omit<Enrollment, 'id'>,
  ): Promise<Enrollment> {
    return this.enrollmentRepository.create(enrollment);
  }

  @get('/enrollments/count')
  @response(200, {
    description: 'Enrollment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Enrollment) where?: Where<Enrollment>,
  ): Promise<Count> {
    return this.enrollmentRepository.count(where);
  }

  @get('/enrollments')
  @response(200, {
    description: 'Array of Enrollment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Enrollment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Enrollment) filter?: Filter<Enrollment>,
  ): Promise<Enrollment[]> {
    return this.enrollmentRepository.find(filter);
  }

  @patch('/enrollments')
  @response(200, {
    description: 'Enrollment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enrollment, {partial: true}),
        },
      },
    })
    enrollment: Enrollment,
    @param.where(Enrollment) where?: Where<Enrollment>,
  ): Promise<Count> {
    return this.enrollmentRepository.updateAll(enrollment, where);
  }

  @get('/enrollments/{id}')
  @response(200, {
    description: 'Enrollment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Enrollment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Enrollment, {exclude: 'where'}) filter?: FilterExcludingWhere<Enrollment>
  ): Promise<Enrollment> {
    return this.enrollmentRepository.findById(id, filter);
  }

  @patch('/enrollments/{id}')
  @response(204, {
    description: 'Enrollment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enrollment, {partial: true}),
        },
      },
    })
    enrollment: Enrollment,
  ): Promise<void> {
    await this.enrollmentRepository.updateById(id, enrollment);
  }

  @put('/enrollments/{id}')
  @response(204, {
    description: 'Enrollment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() enrollment: Enrollment,
  ): Promise<void> {
    await this.enrollmentRepository.replaceById(id, enrollment);
  }

  @del('/enrollments/{id}')
  @response(204, {
    description: 'Enrollment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.enrollmentRepository.deleteById(id);
  }
}
