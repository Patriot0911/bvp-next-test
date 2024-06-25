import { customFormatter } from '@/libs/scripts';

describe('Time ago Unit formatter', () => {
    it('Correct Unit text', () => {
        const value = 1;
        const unitList = [
            'second',
            'minute',
            'day',
        ];
        const unitTextResponse = [
            `Sync less than a minute ago`,
            `Sync ${value} minutes ago`,
            `Sync long time ago`,
        ];
        for(let i = 0; i < unitList.length; i++) {
            const res = customFormatter(value, unitList[i]);
            expect(res).toBe(unitTextResponse[i]);
        };
    });
});
