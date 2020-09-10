import React from 'react';
import { Item, Label, Text, Input, ListItem, CheckBox as NativeCheckBox, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import { GestureHandlerGestureEvent } from 'react-native-gesture-handler';

export type CheckBoxProp = {
    label: string,
    onChange: (value: boolean) => void,
    icon?: string,
    error?: string,
    disabled?: boolean,
    value: boolean
}

const CheckBox = ({ value = false, label, onChange, icon, error, disabled }: CheckBoxProp) => {
    const onCheckBoxChange = () => {
        onChange(!value);
    }
    
    return (
        <>
            <ListItem>
                <NativeCheckBox disabled={disabled} checked={value} onPress={onCheckBoxChange}/>
                <Body>
                    <Text>{label}</Text>
                </Body>
            </ListItem>
            <Text style={styles.error}>{error}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    mandatory: {
        color: '#ff3333',
        marginTop: -12,
        fontSize: 12
    },
    error: {
        height: 16,
        fontSize: 12,
        color: '#ff3333'
    }
});

export default CheckBox;