import React, { useState } from 'react';
import { Button, Footer, Item, Label, ListItem, Right, Text } from 'native-base';
import { Platform, StyleSheet, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Overlay } from 'react-native-elements';

export type DatePickerProp = {
    mandatory?: boolean,
    label: string,
    onChange: (value: Date) => void,
    icon?: string,
    error?: string,
    disabled?: boolean,
    value: Date,
    type?: 'date' | 'time'
}

const DatePicker = ({ value = new Date(), type = 'date', mandatory, label, onChange, icon, error, disabled }: DatePickerProp) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const showPicker = () => {
        if (disabled) {
            return;
        }

        setShow(true);
        setDate(value);
    }

    const onCancel = () => {
        setShow(false)
    }

    const onDateChange = () => {
        onChange(date);
        setShow(false);
    }

    return (
        <>
            <ListItem onPress={showPicker}>
                <Text>{label}</Text>
                <Text>{type === 'date' ? moment(value).format('YYYY-MM-DD') : moment(value).format('hh:mm')}</Text>
            </ListItem>
            <Overlay isVisible={show} overlayStyle={styles.overlay}>
                <>
                    <RNDateTimePicker
                        value={date}
                        mode={type}
                        onChange={(event, selectedDate) => {
                            setDate(selectedDate || date);
                        }}
                    />
                    <View style={styles.right}>
                        <Button transparent onPress={onCancel}><Text>Cancel</Text></Button>
                        <Button transparent onPress={onDateChange}><Text>OK</Text></Button>
                    </View>
                </>
            </Overlay>
        </>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 'auto'
    },
    right: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    }
});

export default DatePicker;