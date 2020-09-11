import React from 'react';
import { Text, ListItem, CheckBox as NativeCheckBox, Body, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';

export type CheckBoxProp = {
    label: string,
    onChange: (value: boolean) => void,
    icon?: {
        type: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined,
        name: string
    },
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
                {
                    icon ? <Icon type={icon.type} name={icon.name} /> : <> </>
                }
                <NativeCheckBox disabled={disabled} checked={value} onPress={onCheckBoxChange} />
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