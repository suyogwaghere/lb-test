import {Entity, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
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
  city: string;

  @property({
    type: 'number',
    required: true,
  })
  zip: number;

  @property({
    type: 'number',
  })
  phone?: number;

  @property({
    type: 'number',
  })
  studentsId?: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
