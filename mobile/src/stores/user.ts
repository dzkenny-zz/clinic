import { observable, action } from 'mobx';
import { ActionState } from '../models/common';
import { Clinic } from '../models/clinic';

export class UserStore {
    @observable
    loginState: ActionState = ActionState.INITIAL;

    @observable 
    token: string = '';

    @observable
    clinic: Clinic = new Clinic();

    // for login page
    @observable
    errorMsg: string = '';

    @action
    setLoginState = (loginState: ActionState) => {
        this.loginState = loginState;
    }

    @action 
    setToken = (token: string) => {
        this.token = token;
    }

    @action
    setClinic = (clinic: Clinic) => {
        this.clinic = clinic;
    }

    @action
    setErrorMessage = (errorMsg: string = '') => {
        this.errorMsg = errorMsg;
    }
}

export default UserStore;
