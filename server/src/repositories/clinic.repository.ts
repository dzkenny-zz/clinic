import {DefaultCrudRepository} from '@loopback/repository';
import {Clinic, ClinicRelations} from '../models';
import {ClinicDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

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
