import {Model, model, property} from '@loopback/repository';

@model()
export class Response extends Model {
  @property({
    type: 'number',
    required: true,
  })
  code: number;

  @property({
    type: 'object',
  })
  payload?: object;

  @property({
    type: 'string',
  })
  message?: string;


  constructor(data?: Partial<Response>) {
    super(data);
  }
}

export interface ResponseRelations {
  // describe navigational properties here
}

export type ResponseWithRelations = Response & ResponseRelations;
