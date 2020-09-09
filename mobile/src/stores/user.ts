import { observable, action } from 'mobx';
import { ActionState } from '../models/common';

export class UserStore {
    @observable
    loginState: ActionState = ActionState.INITIAL;

    @observable 
    token: string = '';


    @action
    setLoginState = (loginState: ActionState) => {
        this.loginState = loginState;
    }

    @action 
    setToken = (token: string) => {
        this.token = token;
    }
}

export default UserStore;
