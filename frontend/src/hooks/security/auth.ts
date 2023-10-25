import { useMutation } from 'react-query';
import axiosClient from '../axiosInstance';

const postUserData = async (data:any) => {
    const res = await axiosClient.post('/auth/login', data).then(res => {
        console.log(res)
        return {
            accessToken:res.data,
            msg: res.data.msg
        }
    });
    return res;
}

export const useUserLogin = () => {
    return useMutation(postUserData);
}

const postRegisteData = async (data:any) => {
    const res = await axiosClient.post('/auth/register', data).then(() => {
        return {
            msg:'Successfully registed'
        }
    });
    return res;
}

export const useRegister = () => {
    return useMutation(postRegisteData);
}


