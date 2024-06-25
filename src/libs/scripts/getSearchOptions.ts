import { Intervals, cryptoList, defaultSearchOptions, } from '@/libs/constants';

const getPeriodOptions = (startPeriod: string | null, finishPeriod: string | null) => {
    const options = {};
    if(startPeriod === null && finishPeriod === null)
        return options;
    if(startPeriod !== null && finishPeriod !== null && Date.parse(finishPeriod) < Date.parse(startPeriod))
        return options;
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
    return options;
};

const getSearchOptions = (query?: URLSearchParams): Partial<typeof defaultSearchOptions> => {
    const options: Partial<typeof defaultSearchOptions> = { };
    if(!query)
        return defaultSearchOptions;
    const interval = query.get('interval');
    const cryptoType = query.get('target');
    const startPeriod = query.get('startPeriod');
    const finishPeriod = query.get('finishPeriod');
    const periodOptions = getPeriodOptions(startPeriod, finishPeriod);
    if(Object.keys(periodOptions).length > 0)
        Object.assign(options, { ...periodOptions, });
    if(cryptoType && typeof cryptoType === 'string') {
        if(!cryptoList.includes(cryptoType))
            throw Error('Unknown crypto type');
        Object.assign(options, { target: cryptoType, })
    }
    if(
        interval
        && typeof interval === 'string'
        && Object.values(Intervals).includes(interval as any)
    )
        Object.assign(options, { interval, });
    const optionsKeys = Object.keys(options);
    const isValidOptions =
        optionsKeys.length > 0 && (
            !optionsKeys.includes('interval') || (optionsKeys.includes('interval') && optionsKeys.includes('period1'))
        );
    const res = !isValidOptions ? defaultSearchOptions : options;
    return res;
}

export default getSearchOptions;
