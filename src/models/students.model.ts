import {Entity, belongsTo, hasMany, hasOne, model, property, referencesMany} from '@loopback/repository';
import {Address} from './address.model';
import {Courses} from './courses.model';
import {Department} from './department.model';
import {Enrollment} from './enrollment.model';
import {Roles} from './roles.model';

@model()
export class Students extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  class: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;


  @belongsTo(() => Department)
  departmentId: number;


  @hasOne(() => Address)
  address: Address;

  @hasMany(() => Courses, {through: {model: () => Enrollment}})
  courses: Courses[];

  @referencesMany(() => Roles)
  rolesIds: number[];

  constructor(data?: Partial<Students>) {
    super(data);
  }
}

export interface StudentsRelations {
  // describe navigational properties heres
}

export type StudentsWithRelations = Students & StudentsRelations;
