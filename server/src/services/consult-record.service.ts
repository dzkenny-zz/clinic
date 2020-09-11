import {UserRepository} from '@loopback/authentication-jwt';
import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import moment from 'moment';
import {ConsultRecordRequest} from '../controllers';
import {ConsultRecord} from '../models';
import {validateDate} from './validate.service';

@bind({scope: BindingScope.TRANSIENT})
export class ConsultRecordService {
  constructor(
    @repository(UserRepository) public userResponsity: UserRepository
  ) {}

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
      followUp: record.followUp === 'Y',
      medication: record.medication || ''
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

  async verifyNewRecord(record: ConsultRecord) {
    const foundUser = await this.userResponsity.findById(record.clinicId);
    if (!foundUser) {
      throw new Error('Cannot found User');
    }

    if (!validateDate(new Date(record.dateTime))) {
      return false;
    }

    if (!record.doctorName || !record.fee || !record.patientName) {
      return false;
    }

    return true;
  }
}
