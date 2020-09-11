import { Stores } from "../stores";
import { getRecords as getRecordsApi, getRecord as getRecordApi, createRecord as createRecordApi, insertRecords } from '../services/records';
import { Navigation, ActionState } from "../models/common";
import * as _ from 'lodash';
import { Record } from "../models/record";
import { DrawerActions } from "@react-navigation/native";
import { Toast } from "native-base";

export type GetRecordsType = {
    stores: Stores
}

export type GoRecordType = {
    stores: Stores,
    navigation: Navigation,
    record: Record
}

export type GetRecordType = {
    stores: Stores
}

export type ClearRecordType = {
    stores: Stores
}

export type CreateRecordType = {
    record: Record,
    stores: Stores,
    navigation: Navigation
}

export async function getRecords({ stores }: GetRecordsType) {
    try {
        stores.calendarStore.setLoadingState(ActionState.IN_PROGRESS);
        const records = await getRecordsApi({ stores });

        // update stores record
        const { date } = stores.calendarStore;
        const concatedRecords = insertRecords({ stores, records });
        stores.recordStore.setRecords(date.getFullYear(), date.getMonth(), concatedRecords);
        stores.calendarStore.setLoadingState(ActionState.SUCCESS);
    }
    catch(error) {
        console.error(`get records error: ${error.message}`);
        stores.calendarStore.setLoadingState(ActionState.FAILURE);
    }
}

export async function getRecord({ stores }: GetRecordType) {
    try {
        stores.recordStore.setLoadingState(ActionState.IN_PROGRESS);
        const record = await getRecordApi({ stores });

        stores.recordStore.setRecord(record);
        stores.recordStore.setLoadingState(ActionState.SUCCESS);
    }
    catch(error) {
        console.error(`get record error: ${error.message}`);
        stores.recordStore.setLoadingState(ActionState.FAILURE);
    }
}

export async function goRecord({ stores, navigation, record }: GoRecordType) {
    stores.recordStore.setRecord(record);
    getRecord({ stores });
    navigation.dispatch(DrawerActions.jumpTo('Record'));
}

export async function clearRecord({ stores }: ClearRecordType) {
    stores.recordStore.setRecord(new Record());
    stores.recordStore.setErrorMessage('');
}

export async function createRecord({ record, stores, navigation }: CreateRecordType) {
    try {
        stores.recordStore.setLoadingState(ActionState.IN_PROGRESS);

        const errorObj = record.validate();
        if (_.size(errorObj)) {
            stores.recordStore.setLoadingState(ActionState.FAILURE);
            return errorObj;
        }

        const { record: savedRecord } = await createRecordApi({ stores, record });
        
        // insert into target row
        const createYear = record.dateTime.getFullYear();
        const createMonth = record.dateTime.getMonth();
        const { rows } = stores.recordStore;
        const row = rows.find(row => row.month === createMonth && row.year === createYear);
        stores.recordStore.setRecords(createYear, createMonth, _.concat(row ? row.records : [], [savedRecord]));
        navigation.goBack();
        stores.recordStore.setLoadingState(ActionState.SUCCESS);
    } catch(error) {
        console.log(error);
        stores.recordStore.setErrorMessage(error.message);
        stores.recordStore.setLoadingState(ActionState.FAILURE);
    }
}