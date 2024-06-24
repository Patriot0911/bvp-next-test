'use client';
import { IDatepickerContainerProps } from '@/libs/types/props';
import { Datepicker } from '@/components/ui';
import './DatepickerContainer.css';

const DatepickerContainer = ({
    firstDate, secondDate,
    setFirstDate, setSecondDate,
}: IDatepickerContainerProps) => {
    return (
        <div
            className={'date-picker-container border-style'}
        >
            <Datepicker
                max={secondDate}
                value={firstDate}
                setValue={setFirstDate}
            />
            <Datepicker
                min={firstDate}
                value={secondDate}
                setValue={setSecondDate}
            />
        </div>
    );
};

export default DatepickerContainer;
