import {DefaultCrudRepository} from '@loopback/repository';
import {ConsultRecord, ConsultRecordRelations} from '../models';
import {ClinicDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConsultRecordRepository extends DefaultCrudRepository<
  ConsultRecord,
  typeof ConsultRecord.prototype.id,
  ConsultRecordRelations
> {
  constructor(
    @inject('datasources.ClinicDb') dataSource: ClinicDbDataSource,
  ) {
    super(ConsultRecord, dataSource);
  }
}
