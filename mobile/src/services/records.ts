import { Record } from "../models/record";
import { Stores } from "../stores";
import { request } from "../utils/request";
import * as _ from 'lodash';
import moment from 'moment';
import { getFirstMonthDate, getFirstWeekDate, getLastMonthDate, getLastWeekDate } from "../utils/common";

export type GetRecordsType = {
    stores: Stores
}

export type GetRecordType = {
    stores: Stores
}

export type InsertRecordsType = {
    stores: Stores,
    records: Record[]
}

export async function getRecords({ stores }: GetRecordsType): Promise<Record[]> {
    // get start date & end date
    const { type, date } = stores.calendarStore;
    let startDate, endDate;
    if (type === 'DAY') {
        startDate = moment(date);
        endDate = moment(date);
    }
    else if (type === 'WEEK') {
        startDate = getFirstWeekDate(date)
        endDate = getLastWeekDate(date)
    }
    else {
        startDate = getFirstMonthDate(date);
        endDate = getLastMonthDate(date)
    }

    const payload = await request({
        url: `/consult-records?startDate=${moment(startDate).format('YYYY-MM-DD')}&endDate=${moment(endDate).format('YYYY-MM-DD')}`,
        headers: {
            Authorization: `Bearer ${stores.userStore.token}`
        }
    });

    if (!payload.values) {
        return [];
    }

    return payload.values.map((record: any) => {
        return new Record(record)
    });
}

export async function getRecord({ stores }: GetRecordType): Promise<Record> {
    const { record } = stores.recordStore;
    
    const payload = await request({
        url: `/consult-records/${record.id}`,
        headers: {
            Authorization: `Bearer ${stores.userStore.token}`
        }
    });


    if (!payload.value) {
        throw new Error('No Record Found')
    }

    return new Record(payload.value);
}

export function insertRecords({ stores, records }: InsertRecordsType) {
    const { type, date } = stores.calendarStore;
    const { rows } = stores.recordStore;

    // no need to filter if type === month
    if (type === 'MONTH') {
        return records;
    }

    // don't remove data for cache
    // find month record first
    const row = rows.find(row => row.month === date.getMonth());

    // no record find, just update record
    if (!row) {
        return records
    }

    if (type === 'DAY') {
        // remove all records at target date
        row.records.filter(record => 
            moment(moment(record.dateTime).format('YYYY-MM-DD'))
                .diff(moment(date).format('YYYY-MM-DD'), 'days')
        );

        return _.concat(row.records, records);
    }
    else if (type === 'WEEK') {
        const startDate = moment(getFirstWeekDate(date).format('YYYY-MM-DD'));
        const endDate = moment(getLastWeekDate(date).format('YYYY-MM-DD'));

        // remove all records at target week
        row.records.filter(record => {
            const dateTime = moment(moment(record.dateTime).format('YYYY-MM-DD'));
            return dateTime.diff(startDate) < 0 && dateTime.diff(endDate) > 0
        });
        
        return _.concat(row.records, records);
    }

    return [];
}