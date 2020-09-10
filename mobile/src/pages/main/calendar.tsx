import React, { useEffect, useState } from 'react';
import { useStores } from '../../stores';
import { getRecords } from '../../actions/records';
import { Calendar } from 'react-native-calendars';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import moment from 'moment';
import { changeDate } from '../../actions/calendar';
import { ActionState } from '../../models/common';

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
    const { rows } = stores.recordStore;
    const row = rows.find(row => row.month === date.getMonth() && row.year === date.getFullYear());

    // set dots if there are records in that date
    let markedDates: any = {};
    if (row) {
        _.forEach(row.records, record => {
            markedDates[moment(record.dateTime).format('YYYY-MM-DD')] = { marked: true };
        });
    }

    // set selected date
    const dateString = moment(date).format('YYYY-MM-DD');
    markedDates[dateString] = _.assign(markedDates[dateString], { selected: true });

    // no need to update since the data is get already
    const onDateChange = (data: any) => {
        changeDate({ stores, date: moment(data.timestamp).toDate() });
    }

    const onMonthChange = (data: any) => {
        onDateChange(data);
        getRecords({ stores });
    }

    const isLoading = stores.calendarStore.loadingState === ActionState.IN_PROGRESS

    // get records 

    return (
        <>
            <Calendar
                markedDates={markedDates}
                onDayPress={onDateChange}
                onMonthChange={onMonthChange}
                disableMonthChange={isLoading}
                disableArrowLeft={isLoading}
                disableArrowRight={isLoading}
            />
        </>
    )
})

export default CustomCalendar;