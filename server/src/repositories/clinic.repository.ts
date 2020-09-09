import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ClinicDbDataSource} from '../datasources';
import {Clinic, ClinicRelations} from '../models';

export class ClinicRepository extends DefaultCrudRepository<
  Clinic,
  typeof Clinic.prototype.id,
  ClinicRelations
  > {
  constructor(
    @inject('datasources.ClinicDb') dataSource: ClinicDbDataSource,
  ) {
    super(Clinic, dataSource);
  }
}
