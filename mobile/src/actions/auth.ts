import { Stores } from "../stores";
import { login as userLogin, logout as userLogout, register as userRegister } from '../services/auth';
import { Navigation, ActionState } from "../models/common";
import { StackActions } from "@react-navigation/core";
import { Clinic } from "../models/clinic";
import * as _ from 'lodash';

type LoginType = {
    email: string,
    password: string,
    stores: Stores
    navigation: Navigation
};

type LogoutType = {
    stores: Stores,
    navigation: Navigation
}

type GoRegistionType = {
    navigation: Navigation
}

type RegisterType = {
    clinic: Clinic
    stores: Stores,
    navigation: Navigation
}

export async function login({ email, password, stores, navigation }: LoginType) {
    try {
        stores.userStore.setLoginState(ActionState.IN_PROGRESS);
        const { token, clinic } = await userLogin(email, password);

        stores.userStore.setToken(token);
        stores.userStore.setClinic(clinic);
        
        navigation.dispatch(StackActions.replace('Home'));
        stores.userStore.setErrorMessage('');
        stores.userStore.setLoginState(ActionState.SUCCESS);
    } catch(error) {
        console.log(error);
        stores.userStore.setErrorMessage(error.message);
        stores.userStore.setLoginState(ActionState.FAILURE);
    }
}

export async function goRegistion({ navigation }: GoRegistionType) {
    navigation.dispatch(StackActions.push('Registion'));
}

export async function register({ clinic, stores, navigation }: RegisterType) {
    try {
        stores.userStore.setLoginState(ActionState.IN_PROGRESS);
        const errorObj = clinic.validate();
        if (_.size(errorObj)) {
            stores.userStore.setLoginState(ActionState.FAILURE);
            return errorObj;
        }

        const { token, clinic: savedClinic} = await userRegister(clinic);

        stores.userStore.setToken(token);
        stores.userStore.setClinic(savedClinic);
        
        navigation.dispatch(StackActions.replace('Home'));
        stores.userStore.setLoginState(ActionState.SUCCESS);
    } catch(error) {
        console.log(error);
        stores.userStore.setErrorMessage(error.message);
        stores.userStore.setLoginState(ActionState.FAILURE);
    }
}

export async function logout({ stores, navigation }: LogoutType) {
    navigation.dispatch(StackActions.replace('Login'));
}