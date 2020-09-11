import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Image, Text } from 'react-native';
import { Icon, View, Button } from 'native-base';
import { useStores } from '../../stores';
import { useNavigation } from '@react-navigation/core';
import { logout } from '../../actions/auth';

const SideMenu = ({ progress, ...rest }: any) => {
    const stores = useStores();
    const navigation = useNavigation();

    const onLogout = () => {
        logout({ stores, navigation });
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <Image style={styles.companyLogo} source={require('../../assets/images/logo.png')} />
                    </View>
                    <View style={styles.headerRow}>
                        <Text>{ stores.userStore.clinic.name }</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <Text>{ stores.userStore.clinic.email }</Text>
                    </View>
                </View>
                <View style={styles.content}>
                </View>
                <View style={styles.footer}>
                    <View style={styles.buttons}>
                    <Button transparent small style={styles.iconButton} onPress={onLogout}>
                        <Icon type='AntDesign' name="logout" />
                    </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        borderStyle: 'solid',
        paddingBottom: 24
    },
    headerRow: {
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 24
    },
    personIcon: {
        flex: 1,
        justifyContent: 'center'
    },
    companyLogo: {
        flex: 1,
        resizeMode: 'contain'
    },
    content: {
        flex: 1
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 24
    },
    iconButton: {
        
    }
})

export default SideMenu;