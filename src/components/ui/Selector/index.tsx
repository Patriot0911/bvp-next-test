'use client';

import { ISelectOption } from '@/libs/types/global';
import { ISelectorProps } from '@/libs/types/props';
import { useState } from 'react';
import './Selector.css';

function Selector<ValueType>({ options, setValue, className, }: ISelectorProps<ValueType>) {
    const [selected, setSelected] = useState<number>(0);
    const [isShown, setIsShown] = useState(false);

    const showHandle = () => setIsShown(
        prevState => !prevState
    );

    const setHandle = (item: ISelectOption<ValueType>, index: number) => () => {
        showHandle();
        setSelected(index);
        setValue(item.value);
    };

    return (
        <div
            className={`item-selector-wrapper border-style ${className}`}
            data-testid={className ? className : 'selector'}
        >
            <label
                onClick={showHandle}
            >
                {options[selected].children}
            </label>
            <ul
                className={`select-list`}
            >
                {
                    isShown &&
                    options.map(
                        (item, index) => (
                            <li
                                className={`select-item`}
                                key={`${item.value}-select-item`}
                                onClick={setHandle(item, index)}
                            >
                                {options[index].children}
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
};

export default Selector;
