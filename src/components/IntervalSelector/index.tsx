'use client';

import { useState } from 'react';
import { Intervals } from '@/libs/constants';
import { ISelectOption } from '@/libs/types/global';
import { IIntervalSelectorProps } from '@/libs/types/props';
import './IntervalSelector.css';

const getInitOptions = (): ISelectOption[] => ([
    ...Object.keys(Intervals).map(
        item => {
            const key = item as keyof typeof Intervals;
            return {
                name: item,
                value: Intervals[key],
            };
        }
    ),
]);

const getInitSelected = (value: Intervals) => (): ISelectOption => ({
    name: 'Days',
    value,
});

const IntervalSelector = ({ interval, setInterval, }: IIntervalSelectorProps) => {
    const [selected, setSelected] = useState<ISelectOption>(getInitSelected(interval));
    const [options] = useState<ISelectOption[]>(getInitOptions);
    const [isShown, setIsShown] = useState(false);

    const showHandle = () => setIsShown(
        prevState => !prevState
    );

    const setHandle = (item: ISelectOption) => () => {
        showHandle();
        setSelected(item);
        setInterval(item.value);
    };

    return (
        <div
            className={'interval-select-wrapper border-style'}
        >
            <label
                onClick={showHandle}
            >
                {selected.name}
            </label>
            <ul
                className={'interval-list'}
            >
                {
                    isShown && options.map(
                        item => (
                            <li
                                className={'interval-item'}
                                key={`${item.value}-interval-item`}
                                onClick={setHandle(item)}
                            >
                                {item.name}
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
};

export default IntervalSelector;
