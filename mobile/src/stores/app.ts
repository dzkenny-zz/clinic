import { observable, action } from 'mobx';
import { ActionState } from '../models/common';

export class AppStore {
    @observable
    isLoading: boolean = false;
    
    @observable
    loadingMessage: string = '';

    @action
    setLoading = (isLoading: boolean, title: string = '') => {
        this.isLoading = isLoading;
        this.loadingMessage = title;
    }
}

export default AppStore;
