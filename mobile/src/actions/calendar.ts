import { Record } from "../models/record";
import { CalendarType, Navigation } from "../models/common";
import { Stores } from "../stores";

export type ChangeDateType = {
    stores: Stores,
    date: Date
}

export type ChangeModeType = {
    stores: Stores,
    type: CalendarType
}

export type GoCalendarType = {
    stores: Stores,
    navigation: Navigation,
}

export function changeDate({ stores, date }: ChangeDateType) {
    stores.calendarStore.setDate(date);
}

export function changeType({ stores, type }: ChangeModeType) {
    stores.calendarStore.setCalendarType(type);
}

export function goCalendar({ stores, navigation }: GoCalendarType) {
    stores.recordStore.setRecord(new Record);
    navigation.goBack();
}