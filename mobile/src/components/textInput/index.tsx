import React from 'react';
import { Item, Label, Text, Input } from 'native-base';
import { StyleSheet } from 'react-native';

export type TextInputProp = {
    mandatory?: boolean,
    label: string,
    onChange: (value: string) => void,
    icon?: string,
    error?: string,
    disabled?: boolean,
    secureTextEntry?: boolean,
    value: string,
    type?: 'email-address' | 'default'
}

const TextInput = ({ value, type = 'default', mandatory, label, onChange, icon, error, disabled, secureTextEntry }: TextInputProp) => {
    return (
        <>
            <Item floatingLabel error={!!error} disabled={disabled}>
                <Label><Text>{label} </Text>{mandatory ? <Text style={styles.mandatory}>*</Text> : null}</Label>
                <Input keyboardType={type} value={value} onChangeText={onChange} disabled={disabled} secureTextEntry={secureTextEntry} />

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

export default TextInput;