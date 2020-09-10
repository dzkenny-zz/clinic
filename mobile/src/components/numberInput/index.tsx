import React from 'react';
import { Item, Label, Text, Input } from 'native-base';
import { StyleSheet } from 'react-native';

export type NumberInputProp = {
    mandatory?: boolean,
    label: string,
    onChange: (value: number) => void,
    icon?: string,
    error?: string,
    disabled?: boolean,
    value: number,
    type?: 'decimal' | 'int'
}

const NumberInput = ({ value = 0, type = 'int', mandatory, label, onChange, icon, error, disabled }: NumberInputProp) => {
    const onNumberChange = (value: string) => {
        const val = type === 'int' ? Number.parseInt(value) : Number.parseFloat(value);
        if (val !== NaN) {
            onChange(val);
        } else if (value === '') {
            onChange(0);
        }
    }
    return (
        <>
            <Item floatingLabel error={!!error} disabled={disabled}>
                <Label><Text>{label} </Text>{mandatory ? <Text style={styles.mandatory}>*</Text> : null}</Label>
                <Input keyboardType={'numeric'} value={value.toString()} onChangeText={onNumberChange} disabled={disabled} />
            </Item>
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

export default NumberInput;