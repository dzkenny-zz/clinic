import React, { useEffect, useState } from 'react';
import { useStores } from '../../stores';
import { getRecords } from '../../actions/records';
import { Calendar } from 'react-native-calendars';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import moment from 'moment';
import { changeDate } from '../../actions/calendar';
import { ActionState } from '../../models/common';
import { DatePicker, Text } from 'native-base';

const CustomCalendar = observer(() => {
    const stores = useStores();
    const [inited, setInited] = useState(false);
    useEffect(() => {
        if (!inited) {
            getRecords({ stores })
                .then(() => {
                    setInited(true);
                });
        }
    }, []);

    // find out the records in target month
    const { date } = stores.calendarStore;

    // set selected date
    const dateString = moment(date).format('D/M/YYYY');
    // no need to update since the data is get already
    const onDateChange = (date: Date) => {
        console.log(date);
        changeDate({ stores, date });
        getRecords({ stores });
    }

    const isLoading = stores.calendarStore.loadingState === ActionState.IN_PROGRESS

    return (
        <>
            <Text>Selected Date: </Text>
            <DatePicker
                onDateChange={onDateChange}
                disabled={isLoading}
                placeHolderText={dateString}
            >
            </DatePicker>
        </>
    )
})

export default CustomCalendar;