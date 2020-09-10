import React from 'react';
import AppStore from './app';
import CalendarStore from './calendar';
import RecordStore from './record';
import UserStore from './user';

const stores = {
    userStore: new UserStore(),
    appStore: new AppStore(),
    calendarStore: new CalendarStore(),
    recordStore: new RecordStore()
};

export const storesContext = React.createContext(stores);

export const useStores = () => React.useContext(storesContext);

export type Stores = typeof stores;