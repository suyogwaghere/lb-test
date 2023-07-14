import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentDbDataSource} from '../datasources';
import {Courses, CoursesRelations} from '../models';

export class CoursesRepository extends DefaultCrudRepository<
  Courses,
  typeof Courses.prototype.id,
  CoursesRelations
> {
  constructor(
    @inject('datasources.student_db') dataSource: StudentDbDataSource,
  ) {
    super(Courses, dataSource);
    }
}
