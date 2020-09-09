import * as _ from 'lodash';
import { validateEmail, validatePhone } from '../utils/common';

export class Clinic {
    id: string = '';
    name: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';

    // for registion use
    password?: string = '';
    password2?: string = '';

    constructor(data?: Partial<Clinic>) {
        if (data) {
            this.parse(data);
        }
    }

    parse(data: Partial<Clinic>) {
        this.id = data?.id || '';
        this.name = data?.name || '';
        this.email = data?.email || '';
        this.phone = data?.phone || '';
        this.address = data?.address || '';

        // for register
        this.password = data?.password || '';
        this.password2 = data?.password2 || '';
    }

    validate() {
        let error: any = {};
        if (_.size(this.password) < 8) {
            error['password'] = 'Password must contain at lease 8 characters';
        }

        if (!this.password2 || this.password !== this.password2) {
            error['password2'] = 'Both passwords are not equal';
        }

        if (!validateEmail(this.email)) {
            error['email'] = 'Email is not in correct format';
        }

        if (!this.email) {
            error['email'] = 'Email cannot be empty';
        }

        if (!validatePhone(this.phone)) {
            error['phone'] = 'Phone is not in correct format';
        }

        if (!this.phone) {
            error['phone'] = 'Phone number cannot be empty';
        }

        if (!this.name) {
            error['name'] = 'Clinic name cannot be empty';
        }

        if (!this.address) {
            error['address'] = 'Address cannot be empty';
        }

        return error;
    }
}