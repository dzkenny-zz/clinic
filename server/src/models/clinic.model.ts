import {Entity, model, property} from '@loopback/repository';

@model()
export class Clinic extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  phone: string;

  @property({
    type: 'string',
    required: true
  })
  address: string;

  constructor(data?: Partial<Clinic>) {
    super(data);
  }
}

export interface ClinicRelations {
  // describe navigational properties here
}

export type ClinicWithRelations = Clinic & ClinicRelations;
