import { Intervals, defaultSearchOptions, } from '@/libs/constants';

const getSearchOptions = (query?: URLSearchParams): Partial<typeof defaultSearchOptions> => {
    const options = {};
    if(!query)
        return defaultSearchOptions;
    const interval = query.get('interval');
    const startPeriod = query.get('startPeriod');
    const finishPeriod = query.get('finishPeriod');
    if(
        startPeriod
        && typeof startPeriod === 'string'
        && Date.parse(startPeriod)
    )
        Object.assign(options, { period1: startPeriod, });
    if(
        finishPeriod
        && typeof finishPeriod === 'string'
        && Date.parse(finishPeriod)
    )
        Object.assign(options, { period2: finishPeriod, });
    if(
        interval
        && typeof interval === 'string'
        && Object.values(Intervals).includes(interval as any)
    )
        Object.assign(options, { interval, });
    const res = Object.keys(options).length < 1 ? defaultSearchOptions : options;
    return res;
}

export default getSearchOptions;
