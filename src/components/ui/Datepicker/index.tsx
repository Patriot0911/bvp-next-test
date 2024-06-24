'use client';
import { IDatepickerProps } from '@/libs/types/props';
import { ChangeEvent } from 'react';
import './Datepicker.css';

const Datepicker = ({ value, setValue, max, min, }: IDatepickerProps) => {
    const handle = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.currentTarget.value;
        if(targetValue === max || targetValue === min)
            return;
        setValue(targetValue);
    };
    return (
        <div
            className={`date-container`}
        >
            <label>{value}</label>
            <input
                onChange={handle}
                className={'date-picker-inout'}
                value={value}
                min={min}
                max={max}
                type={'date'}
            />
        </div>
    );
};

export default Datepicker;
