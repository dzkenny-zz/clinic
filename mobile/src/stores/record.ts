import { observable, action } from 'mobx';
import { ActionState } from '../models/common';
import { Record } from '../models/record';

export type RecordRow = {
    month: number,
    records: Record[]
}

export class RecordStore {
    @observable
    rows: RecordRow[] = [];

    @observable
    record: Record = new Record();

    @observable
    loadingState: ActionState = ActionState.INITIAL

    @action
    setRecords = (month: number, records: Record[]) => {
        const row = this.rows.find(row => row.month === month);
        if (!row) {
            this.rows.push({
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
}

export default RecordStore;
