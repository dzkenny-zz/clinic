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
    }

    validate() {
        let error: any = {};
        return error;
    }
}