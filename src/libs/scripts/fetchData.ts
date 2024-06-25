import { TSetChartHandle, ISearchParams, IChartData, } from '@/libs/types/global';
import { getFetchUrl } from '@/libs/scripts';

const fetchData = async (
    params?: ISearchParams,
    setData?: TSetChartHandle,
    signal?: AbortSignal,
): Promise<IChartData | undefined> => {
    try {
        const url = getFetchUrl(params);
        const response = await fetch(url, {
            signal,
        });
        if(!response)
            throw new Error('Cannot find response');
        const { data, message, state, } = await response.json();
        if(!state)
            throw new Error(message);
        if(setData && !signal?.aborted)
            setData(data);
        return data;
    } catch(e) {
        return;
    };
};

export default fetchData;
