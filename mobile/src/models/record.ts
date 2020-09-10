import * as _ from 'lodash';
import { validateEmail, validatePhone } from '../utils/common';

export class Record {
    id: string = '';
    doctor: string = '';
    patient: string = '';
    diagonsis: string = '';
    fee: number = 0;
    dateTime: Date = new Date();
    followUp: boolean = false;
    medication: string = '';

    constructor(data?: Partial<Record>) {
        if (data) {
            this.parse(data);
        }
    }

    parse(data: Partial<Record>) {
        this.id = data?.id || '';
        this.doctor = data?.doctor || '';
        this.patient = data?.patient || '';
        this.diagonsis = data?.diagonsis || '';
        this.fee = data?.fee || 0;
        this.dateTime = data?.dateTime || new Date();
        this.followUp = data?.followUp || false;
        this.medication = data?.medication || '';
    }

    validate() {
        let error: any = {};

        if (!this.doctor) {
            error.doctor = 'Doctor name cannot be missing';
        }

        if (!this.patient) {
            error.patient = 'Patient name cannot be missing';
        }

        if (!this.fee) {
            error.fee = 'Fee cannot be 0 or empty'
        }
        return error;
    }
}