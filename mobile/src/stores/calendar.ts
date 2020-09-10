import { observable, action } from 'mobx';
import { ActionState, CalendarType } from '../models/common';

export class CalendarStore {
    @observable
    type: CalendarType = 'MONTH';

    @observable
    date: Date = new Date();

    @observable
    loadingState: ActionState = ActionState.INITIAL;

    @action
    setCalendarType = (type: CalendarType) => {
        this.type = type;
    }

    @action
    setLoadingState = (state: ActionState) => {
        this.loadingState =state;
    }

    @action
    setDate = (date: Date) => {
        this.date = date;
    }
}

export default CalendarStore;
