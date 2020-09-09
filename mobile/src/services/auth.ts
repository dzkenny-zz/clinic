import Axios from "axios";
import { Clinic } from "../models/clinic";
import { request } from "../utils/request";

export type LoginResp = {
    token: string,
    clinic: Clinic
}

export async function login(email: string, password: string): Promise<LoginResp> {
    const payload = await request({
        url: `http://192.168.0.133:3000/login`,
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

export function logout() {

}