import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from '../main';
import SideMenu from './sideMenu';
import Loading from './loading';
import RecordPage from '../record';
import CreateRecordPage from '../record/create';

const Drawer = createDrawerNavigator();

const HomePage = () => {
    return (
        <>
            <Loading />
            <Drawer.Navigator 
                initialRouteName="Main"
                drawerContent={(props: any) => <SideMenu {...props} />}
            >   
                <Drawer.Screen name="Main" component={MainPage} />
                <Drawer.Screen name="Record" component={RecordPage} />
                <Drawer.Screen name="Create" component={CreateRecordPage} />
            </Drawer.Navigator>
        </>
    )
}

export default HomePage;