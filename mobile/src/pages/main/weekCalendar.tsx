import React, { useEffect, useState, Component } from 'react';
import { useStores } from '../../stores';
import { getRecords } from '../../actions/records';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import moment from 'moment';
import { changeDate } from '../../actions/calendar';
import { ActionState } from '../../models/common';
import WeeklyCalendar from 'react-native-calendar-strip';
import { StyleSheet, Vibration } from 'react-native';
import { Text, View } from 'native-base';
import { isSameDate } from '../../utils/common';

const WeekCalendar = observer(() => {
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
    let markedDates: any = [];
    if (row) {
        _.forEach(row.records, record => {
            const dateStr = moment(record.dateTime).format('YYYY-MM-DD');
            const foundDate = markedDates.find((markedDate: any) => markedDate.date === dateStr);
            if (!foundDate) {
                markedDates.push({
                    date: dateStr,
                    dots: [{
                        color: 'red'
                    }]
                });
            }
        });
    }

    // no need to update since the data is get already
    const onDateChange = (date: any) => {
        changeDate({ stores, date: moment(date).toDate() });
    }

    const onWeekChanged = (startDate: Date, endDate: Date) => {
        onDateChange(startDate);
        getRecords({ stores });
    }

    const isLoading = stores.calendarStore.loadingState === ActionState.IN_PROGRESS

    // get records 

    return (
        <>
            <WeeklyCalendar
                selectedDate={date}
                onDateSelected={onDateChange}
                onWeekChanged={onWeekChanged}
                style={styles.calendar}
            />
            <Text>Date: {moment(date).format('YYYY-MM-DD')}</Text>
        </>
    )
})

const styles = StyleSheet.create({
    calendar: {
        flex: 1
    },
    selected: {
        backgroundColor: 'blue',
        color: 'blue'
    },
    default: {
        color: 'black'
    }
})

export default WeekCalendar;