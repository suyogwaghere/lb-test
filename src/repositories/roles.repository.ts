import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {StudentDbDataSource} from '../datasources';
import {Roles, RolesRelations} from '../models';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {
  constructor(
    @inject('datasources.student_db') dataSource: StudentDbDataSource,
  ) {
    super(Roles, dataSource);
  }
}
