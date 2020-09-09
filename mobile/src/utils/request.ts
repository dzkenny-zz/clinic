import Axios, { AxiosRequestConfig } from "axios";

export async function request(config: AxiosRequestConfig): Promise<any> {
    const resp = await Axios(config);

    if (resp && resp.data) {
        if ([200, 201].indexOf(resp.data.code) > -1) {
            return resp.data.payload;
        } else if (resp.data.message) {
            throw new Error(resp.data.message)
        }
    }
    throw new Error('Request Error');
}