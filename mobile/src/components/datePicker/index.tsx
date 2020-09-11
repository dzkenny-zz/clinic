import React, { useState } from 'react';
import { Button, Icon, ListItem, Right, Text } from 'native-base';
import { Platform, StyleSheet, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Overlay } from 'react-native-elements';

export type DatePickerProp = {
    mandatory?: boolean,
    label: string,
    onChange: (value: Date) => void,
    icon?: {
        type: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined,
        name: string
    },
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
        <View style={styles.container}>
            <ListItem onPress={showPicker} style={styles.listItem}>
                {
                    icon ? <View style={styles.leftIcon}><Icon type={icon.type} name={icon.name} /></View> : <> </>
                }
                <View style={styles.body}>
                    <Text>{label}</Text>
                    <Text>{type === 'date' ? moment(value).format('YYYY-MM-DD') : moment(value).format('hh:mm')}</Text>
                </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 12
    },
    overlay: {
        height: 'auto'
    },
    right: {
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    listItem: {
        margin: 0,
        padding: 0
    },
    leftIcon: {
        width: 24
    },
    body: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default DatePicker;