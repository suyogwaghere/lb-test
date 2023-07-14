import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentDbDataSource} from '../datasources';
import {Department, DepartmentRelations} from '../models';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {
  constructor(
    @inject('datasources.student_db') dataSource: StudentDbDataSource,
  ) {
    super(Department, dataSource);
  }
}
