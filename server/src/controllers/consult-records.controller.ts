import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,

  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post,
  put,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {ConsultRecord, Response} from '../models';
import {ConsultRecordRepository} from '../repositories';

export class ConsultRecordsController {
  constructor(
    @repository(ConsultRecordRepository)
    public consultRecordRepository: ConsultRecordRepository,
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
          schema: getModelSchemaRef(ConsultRecord, {
            title: 'NewConsultRecord',
            exclude: ['id', 'clinicId'],
          }),
        },
      },
    })
    consultRecord: Omit<ConsultRecord, 'id'>,
  ): Promise<Response> {
    try {
      // create consult record
      consultRecord.clinicId = currentUserProfile.id;
      const savedConsultRecord = await this.consultRecordRepository.create(consultRecord);

      console.log(`success create consult record: ${savedConsultRecord.id}`);
      return new Response({
        code: 201,
        payload: {
          id: savedConsultRecord.id
        }
      });
    } catch(error) {
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
              items: getModelSchemaRef(ConsultRecord, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<Response> {
    try {
      // get consult records by id
      const consultRecords: ConsultRecord[] = await this.consultRecordRepository.find({
        where: {clinicId: currentUserProfile.id}
      });
      return new Response({
        code: 200,
        payload: {
          values: consultRecords
        }
      })
    } catch(error) {
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
            schema: getModelSchemaRef(ConsultRecord, {includeRelations: true}),
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
      return new Response({
        code: 200,
        payload: {
          value: consultRecord
        }
      })
    } catch(error) {
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
    @requestBody() consultRecord: ConsultRecord,
  ): Promise<Response> {
    try{
      await this.consultRecordRepository.replaceById(id, consultRecord);
      return new Response({
        code: 204
      });
    } catch(error) {
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
    try{
      await this.consultRecordRepository.deleteById(id);
      return new Response({
        code: 204
      });
    } catch(error) {
      console.error(`Cannot delete consult record: ${error.message}`);
      return new Response({
        code: 304,
        message: error.message
      });
    }
  }
}
