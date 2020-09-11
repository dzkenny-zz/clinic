import { observable, action } from 'mobx';
import { ActionState } from '../models/common';
import { Record } from '../models/record';

export type RecordRow = {
    month: number,
    year: number,
    records: Record[]
}

export class RecordStore {
    @observable
    rows: RecordRow[] = [];

    @observable
    record: Record = new Record();

    @observable
    loadingState: ActionState = ActionState.INITIAL;

    @observable
    errorMsg: string = '';

    @action
    setRecords = (year: number, month: number, records: Record[]) => {
        const row = this.rows.find(row => row.month === month && row.year === year);
        if (!row) {
            this.rows.push({
                year,
                month,
                records
            });
        }
        else {
            row.records = records;
        }
    }

    @action 
    setRecord = (record: Record) => {
        this.record = record;
    }

    @action
    setLoadingState = (state: ActionState) => {
        this.loadingState = state;
    }

    @action
    setErrorMessage = (message: string) => {
        this.errorMsg = message;
    }

    @action
    init = () => {
        this.rows = [];
        this.record = new Record();
        this.loadingState = ActionState.INITIAL;
        this.errorMsg = '';
    }
}

export default RecordStore;
