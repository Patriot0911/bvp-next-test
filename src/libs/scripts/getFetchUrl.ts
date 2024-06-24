import { ISearchParams } from '@/libs/types/global';
import { baseURL } from '@/libs/constants';

const getFetchUrl = (params?: ISearchParams): string => {
    const url = new URL(baseURL);
    if(!params)
        return baseURL;
    const keysList = Object.keys(params);
    for(const k of keysList) {
        const key = k as keyof typeof params;
        const value = params[key];
        if(
            value === undefined ||
            value === null ||
            typeof value !== 'string' ||
            value.length < 1
        )
            continue;
        url.searchParams.append(key, value);
    };
    return url.toString();
};

export default getFetchUrl;
