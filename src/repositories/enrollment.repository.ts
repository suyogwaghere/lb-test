import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentDbDataSource} from '../datasources';
import {Enrollment, EnrollmentRelations} from '../models';

export class EnrollmentRepository extends DefaultCrudRepository<
  Enrollment,
  typeof Enrollment.prototype.id,
  EnrollmentRelations
> {
  constructor(
    @inject('datasources.student_db') dataSource: StudentDbDataSource,
  ) {
    super(Enrollment, dataSource);
  }
}
