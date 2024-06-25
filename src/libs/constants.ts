export enum Intervals {
    Day         = '1d',
    Week        = '1wk',
    Month       = '1mo',
};

export const baseURL = process.env.NEXT_PUBLIC_PRODUCT === 'TRUE' ?
    process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_DEV_API_URL;

export const cryptoList= ['BTC-USD', 'ETH-USD', 'DOGE-USD', 'BNB-USD', 'SOL-USD'];

export const defaultSearchOptions = {
    period1: '2021-01-01',
    period2: new Date().toDateString(),
    interval: Intervals.Day,
    target:   cryptoList[0],
};
