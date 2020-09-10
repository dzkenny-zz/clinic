import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { Item, Input, Icon, Button, Text, Header, Right } from 'native-base';
import 'mobx-react-lite/batchingForReactNative';
import { login, register } from '../../../actions/auth';
import { useStores } from '../../../stores';
import { useNavigation } from '@react-navigation/native';
import { ActionState } from '../../../models/common';
import { observer } from 'mobx-react';
import * as _ from 'lodash';

const RegisterPage = observer(() => {
    const stores = useStores();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorObj, setErrorObj] = useState<any>({});

    const onEmailChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'email'));
        setEmail(value);
    }

    const onPasswordChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'password'));
        setPassword(value);
    }

    const onPassword2Change = (value: string) => {
        setErrorObj(_.omit(errorObj, 'password2'));
        setPassword2(value);
    }

    const onNameChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'name'));
        setName(value);
    }

    const onPhoneChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'phone'));
        setPhone(value);
    }

    const onAddressChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'address'));
        setAddress(value);
    }

    const onRegister = () => {
        register({ email, password, password2, phone, name, address, stores, navigation })
        .then((error: any = {}) => {
            setErrorObj(error);
        });
    }

    const isLoading = stores.userStore.loginState === ActionState.IN_PROGRESS;

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Header>
                    <Right>
                        <Button onPress={onRegister} transparent>
                            <Text>Register</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.loginContainer}>
                    <Item error={!!errorObj.email}>
                        <Input
                            placeholder="Email"
                            onChangeText={onEmailChange}
                            disabled={isLoading}
                        />
                    </Item>
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorObj.email}
                        </Text>
                    </View>
                    <Item error={!!errorObj.password}>
                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={onPasswordChange}
                            disabled={isLoading}
                        />
                    </Item>
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorObj.password}
                        </Text>
                    </View>
                    <Item error={!!errorObj.password2}>
                        <Input
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            onChangeText={onPassword2Change}
                            disabled={isLoading}
                        />
                    </Item>
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorObj.password2}
                        </Text>
                    </View>
                    <Item error={!!errorObj.name}>
                        <Input
                            placeholder="Clinic Name"
                            onChangeText={onNameChange}
                            disabled={isLoading}
                        />
                    </Item>
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorObj.name}
                        </Text>
                    </View>
                    <Item error={!!errorObj.phone}>
                        <Input
                            placeholder="Phone Number"
                            onChangeText={onPhoneChange}
                            disabled={isLoading}
                        />
                    </Item>
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorObj.phone}
                        </Text>
                    </View>
                    <Item error={!!errorObj.address}>
                        <Input
                            placeholder="Address"
                            onChangeText={onAddressChange}
                            disabled={isLoading}
                        />
                    </Item>
                    <View>
                        <Text style={styles.errorMessage}>
                            {errorObj.address}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
});

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
    },
    languageOptions: {
        alignItems: 'flex-end'
    },
    loginContainer: {
        width: 600,
        maxWidth: '80%',
        alignSelf: 'center',
        marginTop: '20%'
    },
    logo: {
        resizeMode: 'stretch',
        width: 600,
        maxWidth: '100%'
    },
    errorMessage: {
        height: 16,
        fontSize: 12, 
        color: '#ff3333'
    }
});

export default RegisterPage;
