import axios, { AxiosResponse } from 'axios';

export const httpClientGet = async(url: string, config?: Object): Promise<AxiosResponse> => {

    return await axios.get(url, config);
}