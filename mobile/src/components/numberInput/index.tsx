import React from 'react';
import { Item, Label, Text, Input, Icon, View } from 'native-base';
import { StyleSheet } from 'react-native';

export type NumberInputProp = {
    mandatory?: boolean,
    label: string,
    onChange: (value: number) => void,
    icon?: {
        type: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined,
        name: string
    },
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
        <View style={styles.container}>
            <Item floatingLabel error={!!error} disabled={disabled}>
                { icon ? <Icon active type={icon.type} name={icon.name} /> : <></> }
                <Label><Text>{label} </Text>{mandatory ? <Text style={styles.mandatory}>*</Text> : null}</Label>
                <Input keyboardType={'numeric'} value={value.toString()} onChangeText={onNumberChange} disabled={disabled} />
                { error ? <Icon style={styles.icon} active type="MaterialIcons" name="error" color='#ff3333'/> : <> </> }
            </Item>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12
    },
    mandatory: {
        color: '#ff3333',
        marginTop: -12,
        fontSize: 12
    },
    error: {
        height: 16,
        fontSize: 12,
        color: '#ff3333'
    },
    icon: {
        color: '#ff3333'
    }
});

export default NumberInput;