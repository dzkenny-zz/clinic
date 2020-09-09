import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Image, Text } from 'react-native';
import { Icon, View, Button, List, ListItem, Left, Body } from 'native-base';
import { useStores } from '../../stores';
import { useNavigation } from '@react-navigation/core';

const SideMenu = ({ progress, ...rest }: any) => {
    const stores = useStores();
    const navigation = useNavigation();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <View style={styles.personIcon}>
                            <View style={{ width: 64, height: 64, borderRadius: 32, borderColor: 'grey', borderWidth: 1, borderStyle: 'solid', justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name='person' style={{ fontSize: 48 , color: 'grey' }}/>
                            </View>
                        </View>
                        <Image style={styles.companyLogo} source={require('../../assets/images/logo.png')} />
                    </View>
                    <View style={styles.headerRow}>
                        <Text>Agent Name</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <Text>Agent Email</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <List>
                        <ListItem onPress={() => { }}>
                            <Left>
                                <Icon type="FontAwesome" name="users" />
                            </Left>
                            <Body>
                            </Body>
                        </ListItem>
                    </List>
                </View>
                <View style={styles.footer}>
                    <View style={styles.buttons}>
                    <Button transparent small style={styles.iconButton}>
                        <Icon type='FontAwesome' name="power-off" />
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