import { Intervals, defaultSearchOptions } from '@/libs/constants';
import { getSearchOptions } from '@/libs/scripts';

describe('Search Query parser', () => {
    it('Correct default Search Options', () => {
        const searchOptions = getSearchOptions();
        expect(searchOptions).toBe(defaultSearchOptions);
    });
    it('Correct search options with all params', () => {
        const startPeriod = '2024-01-01';
        const finishPeriod ='2024-02-02';
        const interval = Intervals.Day.toString();
        const params = {
            startPeriod,
            finishPeriod,
            interval,
        };
        const expectedRes = {
            period1: startPeriod,
            period2: finishPeriod,
            interval,
        };
        const queryString = new URLSearchParams(params);
        const searchOptions = getSearchOptions(queryString);
        expect(searchOptions).toStrictEqual(expectedRes);
    });
    it('Correct search options without periods but with interval', () => {
        const interval = Intervals.Day.toString();
        const params = {
            interval,
        };
        const queryString = new URLSearchParams(params);
        const searchOptions = getSearchOptions(queryString);
        expect(searchOptions).toStrictEqual(defaultSearchOptions);
    });
    it('Crypto type validation', () => {
        const params = {
            target: 'Unknown target',
        };
        const queryString = new URLSearchParams(params);
        const searchOptions = () => getSearchOptions(queryString);
        expect(searchOptions).toThrow('Unknown crypto type');
    });
});
