import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { Item, Input, Icon, Button, Text, Header, Right, Left } from 'native-base';
import 'mobx-react-lite/batchingForReactNative';
import { login, register } from '../../../actions/auth';
import { useStores } from '../../../stores';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ActionState } from '../../../models/common';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { Clinic } from '../../../models/clinic';
import TextInput from '../../../components/textInput';

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
        const clinic = new Clinic({ password, password2, email, name, phone, address });
        register({ clinic, stores, navigation })
        .then((error: any = {}) => {
            setErrorObj(error);
        });
    }

    const onCancel = () => {
        navigation.dispatch(StackActions.pop(1));
    }

    const isLoading = stores.userStore.loginState === ActionState.IN_PROGRESS;

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Header>
                    <Left>
                        <Button onPress={onCancel} transparent>
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button onPress={onRegister} transparent>
                            <Text>Register</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.loginContainer}>
                    <TextInput type={'email-address'} value={email} label="Email" onChange={onEmailChange} disabled={isLoading} error={errorObj.email} mandatory={true} />
                    <TextInput value={password} label="Password" onChange={onPasswordChange} disabled={isLoading} error={errorObj.password} secureTextEntry={true} mandatory={true} />
                    <TextInput value={password2} label="Re-Enter Password" onChange={onPassword2Change} disabled={isLoading} error={errorObj.password2} secureTextEntry={true} mandatory={true} />
                    <TextInput value={name} label="Clinic Name" onChange={onNameChange} disabled={isLoading} error={errorObj.name} mandatory={true} />
                    <TextInput value={phone} label="Phone Number" onChange={onPhoneChange} disabled={isLoading} error={errorObj.phone} mandatory={true} />
                    <TextInput value={address} label="Address" onChange={onAddressChange} disabled={isLoading} error={errorObj.address} mandatory={true} />
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
