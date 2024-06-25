import { Intervals, baseURL } from '@/libs/constants';
import { getFetchUrl } from '@/libs/scripts';

describe('Fetch Url', () => {
    it('Correct default fetch url', () => {
        const fetchUrl = getFetchUrl();
        expect(fetchUrl).toBe(baseURL);
    });
    it('Correct search fetch url', () => {
        const finishPeriod = new Date().toISOString().split('T')[0];
        const interval = Intervals.Day;
        const fetchUrl = getFetchUrl({
            finishPeriod,
            interval,
        });
        const expectedUrl = baseURL?.concat(`?finishPeriod=${finishPeriod}&interval=${interval}`);
        expect(fetchUrl).toBe(expectedUrl);
    });
});
