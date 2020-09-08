import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Clinic} from '../models';
import {ClinicRepository} from '../repositories';

export class ClinicController {
  constructor(
    @repository(ClinicRepository)
    public clinicRepository : ClinicRepository,
  ) {}

  @post('/clinics', {
    responses: {
      '200': {
        description: 'Clinic model instance',
        content: {'application/json': {schema: getModelSchemaRef(Clinic)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clinic, {
            title: 'NewClinic',
            exclude: ['id'],
          }),
        },
      },
    })
    clinic: Omit<Clinic, 'id'>,
  ): Promise<Clinic> {
    return this.clinicRepository.create(clinic);
  }

  @get('/clinics/count', {
    responses: {
      '200': {
        description: 'Clinic model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Clinic) where?: Where<Clinic>,
  ): Promise<Count> {
    return this.clinicRepository.count(where);
  }

  @get('/clinics', {
    responses: {
      '200': {
        description: 'Array of Clinic model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Clinic, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Clinic) filter?: Filter<Clinic>,
  ): Promise<Clinic[]> {
    return this.clinicRepository.find(filter);
  }

  @patch('/clinics', {
    responses: {
      '200': {
        description: 'Clinic PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clinic, {partial: true}),
        },
      },
    })
    clinic: Clinic,
    @param.where(Clinic) where?: Where<Clinic>,
  ): Promise<Count> {
    return this.clinicRepository.updateAll(clinic, where);
  }

  @get('/clinics/{id}', {
    responses: {
      '200': {
        description: 'Clinic model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Clinic, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Clinic, {exclude: 'where'}) filter?: FilterExcludingWhere<Clinic>
  ): Promise<Clinic> {
    return this.clinicRepository.findById(id, filter);
  }

  @patch('/clinics/{id}', {
    responses: {
      '204': {
        description: 'Clinic PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clinic, {partial: true}),
        },
      },
    })
    clinic: Clinic,
  ): Promise<void> {
    await this.clinicRepository.updateById(id, clinic);
  }

  @put('/clinics/{id}', {
    responses: {
      '204': {
        description: 'Clinic PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() clinic: Clinic,
  ): Promise<void> {
    await this.clinicRepository.replaceById(id, clinic);
  }

  @del('/clinics/{id}', {
    responses: {
      '204': {
        description: 'Clinic DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clinicRepository.deleteById(id);
  }
}
