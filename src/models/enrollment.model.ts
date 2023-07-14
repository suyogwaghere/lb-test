import {Entity, model, property} from '@loopback/repository';

@model()
export class Enrollment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
  })
  enrollmentDate?: string;

  @property({
    type: 'string',
    required: true,
  })
  grade?: string;

  @property({
    type: 'number',
  })
  studentsId?: number;

  @property({
    type: 'number',
  })
  coursesId?: number;

  constructor(data?: Partial<Enrollment>) {
    super(data);
  }
}

export interface EnrollmentRelations {
  // describe navigational properties here
}

export type EnrollmentWithRelations = Enrollment & EnrollmentRelations;
