import {Entity, model, property} from '@loopback/repository';


@model()
export class Courses extends Entity {
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
  title: string;


  constructor(data?: Partial<Courses>) {
    super(data);
  }
}

export interface CoursesRelations {
  // describe navigational properties here
}

export type CoursesWithRelations = Courses & CoursesRelations;
