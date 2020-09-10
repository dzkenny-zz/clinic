import moment, { Moment } from 'moment';

export function validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePhone(phone: string): boolean {
    const re = /^[0-9]{8}$/;
    return re.test(phone);
}

export function getFirstWeekDate(date: Date): Moment {
    return moment().subtract(date.getDay(), 'days');
}

export function getLastWeekDate(date: Date): Moment {
    return moment().add(6 - date.getDay(), 'days');
}

export function getFirstMonthDate(date: Date): Moment {
    const year = date.getFullYear();
    const month = date.getMonth();
    return moment(`${year}-${month + 1}-1`, 'YYYY-M-D');
}

export function getLastMonthDate(date: Date): Moment {
    const year = date.getFullYear();
    const month = date.getMonth();
    return moment(`${year}-${month + 1}-1`, 'YYYY-M-D').add(1, 'months').subtract(1, 'days');
}