import React from 'react';
import { View, Text, Button } from 'native-base';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useStores } from '../../stores';
import { useNavigation } from '@react-navigation/core';

const MainPage = () => {
    const stores = useStores();
    const navigation = useNavigation();
     
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View><Text>Main</Text></View>
                    <Button><Text>Search</Text></Button>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default MainPage;