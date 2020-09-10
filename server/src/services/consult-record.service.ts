import {bind, /* inject, */ BindingScope} from '@loopback/core';
import moment from 'moment';
import {ConsultRecordRequest} from '../controllers';
import {ConsultRecord} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class ConsultRecordService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  convertToRequest(record: ConsultRecord): ConsultRecordRequest {
    return {
      id: record.id,
      doctor: record.doctorName,
      patient: record.patientName,
      diagonsis: record.diagonsis || '',
      fee: record.fee,
      dateTime: new Date(record.dateTime).getTime(),
      followUp: record.followUp === 'Y'
    }
  }

  parseFromRequest(record: ConsultRecordRequest, clinicId: string): ConsultRecord {
    return new ConsultRecord({
      id: record.id,
      clinicId: clinicId,
      doctorName: record.doctor,
      patientName: record.patient,
      diagonsis: record.diagonsis,
      fee: record.fee,
      dateTime: moment(record.dateTime).format(),
      followUp: record.followUp ? 'Y' : 'N'
    });
  }
}
