'use client';

import { useState } from 'react';
import { Selector } from '@/components/ui';
import { Intervals } from '@/libs/constants';
import { ISelectOption } from '@/libs/types/global';
import { IIntervalSelectorProps } from '@/libs/types/props';
import './IntervalSelector.css';

const getInitOptions = (): ISelectOption<Intervals>[] => ([
    ...Object.keys(Intervals).map(
        item => {
            const key = item as keyof typeof Intervals;
            return {
                value: Intervals[key],
                children: <>{key}</>,
            };
        }
    ),
]);

const IntervalSelector = ({ setInterval, }: IIntervalSelectorProps) => {
    const [options] = useState<ISelectOption<Intervals>[]>(getInitOptions);
    return (
        <Selector
            options={options}
            setValue={setInterval}
        />
    );
};

export default IntervalSelector;
