import React from 'react';
import AppStore from './app';
import UserStore from './user';

const stores = {
    userStore: new UserStore(),
    appStore: new AppStore()
};

export const storesContext = React.createContext(stores);

export const useStores = () => React.useContext(storesContext);

export type Stores = typeof stores;