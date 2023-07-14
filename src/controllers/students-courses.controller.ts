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
  Courses,
  Students
} from '../models';
import {StudentsRepository} from '../repositories';

export class StudentsCoursesController {
  constructor(
    @repository(StudentsRepository) protected studentsRepository: StudentsRepository,
  ) { }

  @get('/students/{id}/courses', {
    responses: {
      '200': {
        description: 'Array of Students has many Courses through Enrollment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Courses)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Courses>,
  ): Promise<Courses[]> {
    return this.studentsRepository.courses(id).find(filter);
  }

  @post('/students/{id}/courses', {
    responses: {
      '200': {
        description: 'create a Courses model instance',
        content: {'application/json': {schema: getModelSchemaRef(Courses)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Students.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {
            title: 'NewCoursesInStudents',
            exclude: ['id'],
          }),
        },
      },
    }) courses: Omit<Courses, 'id'>,
  ): Promise<Courses> {
    return this.studentsRepository.courses(id).create(courses);
  }

  @patch('/students/{id}/courses', {
    responses: {
      '200': {
        description: 'Students.Courses PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Courses, {partial: true}),
        },
      },
    })
    courses: Partial<Courses>,
    @param.query.object('where', getWhereSchemaFor(Courses)) where?: Where<Courses>,
  ): Promise<Count> {
    return this.studentsRepository.courses(id).patch(courses, where);
  }

  @del('/students/{id}/courses', {
    responses: {
      '200': {
        description: 'Students.Courses DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Courses)) where?: Where<Courses>,
  ): Promise<Count> {
    return this.studentsRepository.courses(id).delete(where);
  }
}
