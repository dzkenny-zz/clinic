import { Stores } from "../stores";
import { getRecords as getRecordsApi, getRecord as getRecoordApi, insertRecords } from '../services/records';
import { Navigation, ActionState } from "../models/common";
import * as _ from 'lodash';
import { Record } from "../models/record";
import { DrawerActions } from "@react-navigation/native";

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

export async function getRecords({ stores }: GetRecordsType) {
    try {
        stores.calendarStore.setLoadingState(ActionState.IN_PROGRESS);
        const records = await getRecordsApi({ stores });

        // update stores record
        const { date } = stores.calendarStore;
        const concatedRecords = insertRecords({ stores, records });
        stores.recordStore.setRecords(date.getMonth(), concatedRecords);
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
        const record = await getRecoordApi({ stores });

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
    navigation.dispatch(DrawerActions.jumpTo('Record'));
}

export async function clearRecord({ stores }: ClearRecordType) {
    stores.recordStore.setRecord(new Record());
}