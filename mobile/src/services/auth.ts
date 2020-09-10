import { Clinic } from "../models/clinic";
import { request } from "../utils/request";

export type LoginResp = {
    token: string,
    clinic: Clinic
}

export type RegisterType = {
    email: string,
    password: string,
    password2: string,
    name: string,
    phone: string,
    address: string
}

export async function login(email: string, password: string): Promise<LoginResp> {
    const payload = await request({
        url: `/login`,
        method: 'post',
        data: {
            email,
            password
        }
    });

    return {
        token: payload.token,
        clinic: new Clinic(payload.clinic)
    };
}

export async function register(clinic: Clinic) {
    const payload = await request({
        url: `/signup`,
        method: 'post',
        data: {
            email: clinic.email,
            password: clinic.password,
            name: clinic.name,
            phone: clinic.phone,
            address: clinic.address
        }
    });

    return {
        token: payload.token,
        clinic: new Clinic(payload.clinic)
    };
}

export function logout() {

}