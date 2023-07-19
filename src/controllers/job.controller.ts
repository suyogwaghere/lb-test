
import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {PermissionKeys} from '../authorization/permission-keys';

import {Job} from '../models';
import {JobRepository} from '../repositories';

export class JobController {
  constructor(
    @repository(JobRepository)
    public jobRepository : JobRepository,
  ) { }
  @authenticate({
    strategy : 'jwt',
    options: {required: [PermissionKeys.AccessAuthFeature]}
  })
  @post('/jobs')
  @response(200, {
    description: 'Job model instance',
    content: {'application/json': {schema: getModelSchemaRef(Job)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {
            title: 'NewJob',
            exclude: ['id'],
          }),
        },
      },
    })
    job: Omit<Job, 'id'>,
  ): Promise<Job> {
    return this.jobRepository.create(job);
  }

  @get('/jobs/count')
  @response(200, {
    description: 'Job model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Job) where?: Where<Job>,
  ): Promise<Count> {
    return this.jobRepository.count(where);
  }

  @get('/jobs')
  @response(200, {
    description: 'Array of Job model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Job, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Job) filter?: Filter<Job>,
  ): Promise<Job[]> {
    return this.jobRepository.find(filter);
  }

  @patch('/jobs')
  @response(200, {
    description: 'Job PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {partial: true}),
        },
      },
    })
    job: Job,
    @param.where(Job) where?: Where<Job>,
  ): Promise<Count> {
    return this.jobRepository.updateAll(job, where);
  }

  @get('/jobs/{id}')
  @response(200, {
    description: 'Job model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Job, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Job, {exclude: 'where'}) filter?: FilterExcludingWhere<Job>
  ): Promise<Job> {
    return this.jobRepository.findById(id, filter);
  }

  @patch('/jobs/{id}')
  @response(204, {
    description: 'Job PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {partial: true}),
        },
      },
    })
    job: Job,
  ): Promise<void> {
    await this.jobRepository.updateById(id, job);
  }

  @put('/jobs/{id}')
  @response(204, {
    description: 'Job PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() job: Job,
  ): Promise<void> {
    await this.jobRepository.replaceById(id, job);
  }

  @del('/jobs/{id}')
  @response(204, {
    description: 'Job DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.jobRepository.deleteById(id);
  }
}
