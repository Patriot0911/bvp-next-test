export enum Intervals {
    Day         = '1d',
    Week        = '1wk',
    Month       = '1mo',
};

export const defaultSearchOptions = {
    period1: '2021-01-01',
    period2: new Date().toDateString(),
    interval: Intervals.Day,
};

export const baseURL = 'https://bvp-next-test-task.vercel.app/api'; //'http://localhost:3000/api';
