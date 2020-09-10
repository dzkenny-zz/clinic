import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {
  AnyObject,
  model,
  property,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post,
  put,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import moment from 'moment';
import {ConsultRecord, Response} from '../models';
import {ConsultRecordRepository} from '../repositories';
import {ConsultRecordService} from '../services';

@model()
export class ConsultRecordRequest {
  @property({
    type: 'string'
  })
  id?: string;

  @property({
    type: 'string'
  })
  doctor: string;

  @property({
    type: 'string'
  })
  patient: string;

  @property({
    type: 'string',
  })
  diagonsis?: string;

  @property({
    type: 'number'
  })
  fee: number;

  @property({
    type: 'any'
  })
  dateTime: any;

  @property({
    type: 'boolean',
  })
  followUp: boolean;

  @property({
    type: 'string'
  })
  medication: string
}

export class ConsultRecordsController {
  constructor(
    @repository(ConsultRecordRepository) public consultRecordRepository: ConsultRecordRepository,
    @service() public consultRecordService: ConsultRecordService,
  ) {}

  @authenticate('jwt')
  @post('/consult-records', {
    responses: {
      '200': {
        description: 'ConsultRecord model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultRecord)}},
      },
    },
  })
  async create(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultRecordRequest, {
            title: 'NewConsultRecord',
            exclude: ['id'],
          }),
        },
      },
    })
    consultRecord: Omit<ConsultRecordRequest, 'id'>,
  ): Promise<Response> {
    try {
      // convert request to consult record
      const record = this.consultRecordService.parseFromRequest(consultRecord, currentUserProfile.id);

      // validate record first
      const isValid = await this.consultRecordService.verifyNewRecord(record);
      if (!isValid) {
        return new Response({
          code: 304,
          message: 'Please verify the data first'
        });
      }

      // insert record to database
      const savedConsultRecord = await this.consultRecordRepository.create(record);

      console.log(`success create consult record: ${savedConsultRecord.id}`);
      return new Response({
        code: 201,
        payload: {
          id: savedConsultRecord.id
        }
      });
    } catch (error) {
      console.error(`cannot create consult record: ${error.message}`);
      return new Response({
        code: 304,
        message: 'cannot create consult record'
      });
    }

  }

  @authenticate('jwt')
  @get('/consult-records', {
    responses: {
      '200': {
        description: 'Array of ConsultRecord model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ConsultRecordRequest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.date('startDate') startDate: Date,
    @param.query.date('endDate') endDate: Date,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<Response> {
    try {
      // get consult records by id
      const consultRecords: AnyObject = await this.consultRecordRepository.execute(
        `select id, doctorName, patientName, dateTime from [dbo].[ConsultRecord] where clinicId = '${currentUserProfile.id}' and dateTime BETWEEN {ts '${moment(startDate).format('YYYY-MM-DD')} 00:00:00'} AND {ts '${moment(endDate).format('YYYY-MM-DD')} 23:59:59'}`
      )

      const records: ConsultRecordRequest[] = consultRecords.map(this.consultRecordService.convertToRequest);

      return new Response({
        code: 200,
        payload: {
          values: records
        }
      })
    } catch (error) {
      console.error(`cannot get consult records: ${error.message}`);
      return new Response({
        code: 500,
        message: 'Cannot found relative consult records'
      });
    }
  }

  @authenticate('jwt')
  @get('/consult-records/{id}', {
    responses: {
      '200': {
        description: 'ConsultRecord model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ConsultRecordRequest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @param.path.string('id') id: string
  ): Promise<Response> {
    try {
      const consultRecord = await this.consultRecordRepository.findById(id);
      const record = this.consultRecordService.convertToRequest(consultRecord);
      return new Response({
        code: 200,
        payload: {
          value: record
        }
      })
    } catch (error) {
      console.error(`cannot found consult record: ${error.message}`);
      return new Response({
        code: 500,
        message: 'Cannot found relative consult record'
      });
    }

  }

  @authenticate('jwt')
  @put('/consult-records/{id}', {
    responses: {
      '204': {
        description: 'ConsultRecord PUT success',
      },
    },
  })
  async replaceById(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @param.path.string('id') id: string,
    @requestBody() consultRecord: ConsultRecordRequest,
  ): Promise<Response> {
    try {
      const record = this.consultRecordService.parseFromRequest(consultRecord, currentUserProfile.id);
      await this.consultRecordRepository.replaceById(id, record);
      return new Response({
        code: 204
      });
    } catch (error) {
      console.error(`Cannot update consult record: ${error.message}`);
      return new Response({
        code: 304,
        message: error.message
      });
    }
  }

  @authenticate('jwt')
  @del('/consult-records/{id}', {
    responses: {
      '204': {
        description: 'ConsultRecord DELETE success',
      },
    },
  })
  async deleteById(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @param.path.string('id') id: string
  ): Promise<Response> {
    try {
      await this.consultRecordRepository.deleteById(id);
      return new Response({
        code: 204
      });
    } catch (error) {
      console.error(`Cannot delete consult record: ${error.message}`);
      return new Response({
        code: 304,
        message: error.message
      });
    }
  }
}
