import React from 'react';
import { Item, Label, Text, Input, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';

export type TextInputProp = {
    mandatory?: boolean,
    label: string,
    onChange: (value: string) => void,
    icon?: {
        type: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | undefined,
        name: string
    },
    error?: string,
    disabled?: boolean,
    secureTextEntry?: boolean,
    value: string,
    type?: 'email-address' | 'default'
}

const TextInput = ({ value, type = 'default', mandatory, label, onChange, icon, error, disabled, secureTextEntry }: TextInputProp) => {
    return (
        <View style={styles.container}>
            <Item floatingLabel error={!!error} disabled={disabled}>
                { icon ? <Icon active type={icon.type} name={icon.name} /> : <></> }
                <Label><Text>{label} </Text>{mandatory ? <Text style={styles.mandatory}>*</Text> : null}</Label>
                <Input keyboardType={type} value={value} onChangeText={onChange} disabled={disabled} secureTextEntry={secureTextEntry} />
                { error ? <Icon style={styles.icon} active type="MaterialIcons" name="error" /> : <> </> }
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

export default TextInput;