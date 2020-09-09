import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainPage from '../main';
import SideMenu from './sideMenu';
import Loading from './loading';

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
            </Drawer.Navigator>
        </>
    )
}

export default HomePage;