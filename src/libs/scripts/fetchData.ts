import { TSetChartHandle, ISearchParams, } from '@/libs/types/global';
import { getFetchUrl } from '@/libs/scripts';

const fetchData = async (
    params?: ISearchParams,
    setData?: TSetChartHandle,
    signal?: AbortSignal,
) => {
    const url = getFetchUrl(params);
    const response = await fetch(url, {
        signal,
    });
    if(!response)
        return;
    const { data, message, state, } = await response.json();
    if(!state)
        throw new Error(message);
    if(setData && !signal?.aborted)
        setData(data);
    return data;
};

export default fetchData;
