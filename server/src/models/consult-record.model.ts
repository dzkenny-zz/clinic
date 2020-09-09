import {Entity, model, property} from '@loopback/repository';

@model()
export class ConsultRecord extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  clinicId: string;

  @property({
    type: 'string',
    required: true,
  })
  doctorName: string;

  @property({
    type: 'string',
    required: true,
  })
  patientName: string;

  @property({
    type: 'string',
  })
  diagonsis?: string;

  @property({
    type: 'number',
    required: true,
  })
  fee: number;

  @property({
    type: 'string',
    required: true,
  })
  dateTime: string;

  @property({
    type: 'string',
  })
  followUp?: string;


  constructor(data?: Partial<ConsultRecord>) {
    super(data);
  }
}

export interface ConsultRecordRelations {
  // describe navigational properties here
}

export type ConsultRecordWithRelations = ConsultRecord & ConsultRecordRelations;
