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
import {ConsultRecord} from '../models';
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
  ): Promise<ConsultRecord> {
    consultRecord.clinicId = currentUserProfile.id;
    return this.consultRecordRepository.create(consultRecord);
  }

  @authenticate('jwt')
  @get('/consult-records/count', {
    responses: {
      '200': {
        description: 'ConsultRecord model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @param.where(ConsultRecord) where?: Where<ConsultRecord>,
  ): Promise<Count> {
    return this.consultRecordRepository.count(where);
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
  ): Promise<ConsultRecord[]> {
    return this.consultRecordRepository.find({
      where: {clinicId: currentUserProfile.id}
    });
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
    @param.path.string('id') id: string,
    @param.filter(ConsultRecord, {exclude: 'where'}) filter?: FilterExcludingWhere<ConsultRecord>
  ): Promise<ConsultRecord> {
    return this.consultRecordRepository.findById(id, filter);
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
  ): Promise<void> {
    await this.consultRecordRepository.replaceById(id, consultRecord);
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
  ): Promise<void> {
    await this.consultRecordRepository.deleteById(id);
  }
}
