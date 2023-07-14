import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory, ReferencesManyAccessor} from '@loopback/repository';
import {StudentDbDataSource} from '../datasources';
import {Department, Students, StudentsRelations, Address, Courses, Enrollment, Roles} from '../models';
import {DepartmentRepository} from './department.repository';
import {AddressRepository} from './address.repository';
import {EnrollmentRepository} from './enrollment.repository';
import {CoursesRepository} from './courses.repository';
import {RolesRepository} from './roles.repository';

export class StudentsRepository extends DefaultCrudRepository<
  Students,
  typeof Students.prototype.id,
  StudentsRelations
> {
  public readonly department: BelongsToAccessor<Department, typeof Students.prototype.id>;
  public readonly address: HasOneRepositoryFactory<Address, typeof Students.prototype.id>;

  public readonly courses: HasManyThroughRepositoryFactory<Courses, typeof Courses.prototype.id,
          Enrollment,
          typeof Students.prototype.id
        >;

  public readonly roless: ReferencesManyAccessor<Roles, typeof Students.prototype.id>;

  constructor(
    @inject('datasources.student_db') dataSource: StudentDbDataSource, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('EnrollmentRepository') protected enrollmentRepositoryGetter: Getter<EnrollmentRepository>, @repository.getter('CoursesRepository') protected coursesRepositoryGetter: Getter<CoursesRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Students, dataSource);
    this.roless = this.createReferencesManyAccessorFor('roless', rolesRepositoryGetter,);
    this.registerInclusionResolver('roless', this.roless.inclusionResolver);
    this.courses = this.createHasManyThroughRepositoryFactoryFor('courses', coursesRepositoryGetter, enrollmentRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);

    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
  }
}
