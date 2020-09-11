import React from 'react';
import { List, ListItem, Text, View } from 'native-base';
import { Record } from '../../models/record';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import * as _ from 'lodash';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { goRecord } from '../../actions/records';
import { useNavigation } from '@react-navigation/native';

export type RecordListType = {
    records: Record[]
}

const RecordList = observer(() => {
    const stores = useStores();
    const navigation = useNavigation();

    // find target date record
    const { date } = stores.calendarStore;
    const { rows } = stores.recordStore;
    const row = rows.find(row => row.month === date.getMonth() && row.year === date.getFullYear());

    let records = row ? row.records.filter(record => moment(record.dateTime).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')) : [];

    // sort by time
    records = _.sortBy(records, ['dateTime']);

    if (!records.length) {
        return (
            <>
                <Text>No Records</Text>
            </>
        )
    }

    return (
        <>
            <List>
                {
                    records.map((record) => (
                        <ListItem 
                            key={`record-${record.id}`} 
                            onPress={() => {
                                goRecord({ stores, navigation, record});
                            }}
                        >
                            <View style={styles.container}>
                                <View style={styles.leftContainer}>
                                    <Text>Doctor Name:   {record.doctor}</Text>
                                    <Text>Patient Name:   {record.patient}</Text>
                                </View>
                                <View style={styles.rightContainer}>
                                    <Text style={styles.dateTime}>{moment(record.dateTime).format('HH:mm')}</Text>
                                </View>
                            </View>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 2,
        flexDirection: 'column'
    },
    rightContainer: {
        alignSelf: 'center'
    },
    dateTime: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default RecordList;