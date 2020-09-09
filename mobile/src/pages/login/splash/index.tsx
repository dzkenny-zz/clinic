import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Image
} from 'react-native';
import { Item, Input, Icon, Button, Text } from 'native-base';
import 'mobx-react-lite/batchingForReactNative';
import { login } from '../../../actions/auth';
import { useStores } from '../../../stores';
import { useNavigation } from '@react-navigation/native';
import { ActionState } from '../../../models/common';

const SplashPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const stores = useStores();
    const navigation = useNavigation();

    const onLogin = () => {
        login({ email, password, stores, navigation });
    }

    const isLoading = stores.userStore.loginState === ActionState.IN_PROGRESS;

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}
                >
                    <View style={styles.loginContainer}>
                        <View>
                            <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
                        </View>
                        <View>
                            <Item>
                                <Input 
                                    placeholder='email' 
                                    onChangeText={setEmail}
                                    disabled={isLoading}
                                />
                            </Item>
                            <Item>
                                <Input 
                                    placeholder="password" 
                                    secureTextEntry={true}
                                    onChangeText={setPassword}
                                    disabled={isLoading}
                                />
                            </Item>
                        </View>
                        <View>
                            <Button onPress={onLogin}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

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
    }
});

export default SplashPage;
