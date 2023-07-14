import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Department,
  Students,
} from '../models';
import {StudentsRepository} from '../repositories';

export class StudentsDepartmentController {
  constructor(
    @repository(StudentsRepository)
    public studentsRepository: StudentsRepository,
  ) { }

  @get('/students/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to Students',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Department),
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.number('id') id: typeof Students.prototype.id,
  ): Promise<Department> {
    return this.studentsRepository.department(id);
  }
}
