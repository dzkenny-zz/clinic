import Axios from "axios";

export async function login(email: string, password: string) {
    const resp = await Axios({
        url: `http://[::1]:3000/login`,
        method: 'post',
        data: {
            email,
            password
        }
    });
    
    return {
        token: resp.data.token
    }

}

export function logout() {

}