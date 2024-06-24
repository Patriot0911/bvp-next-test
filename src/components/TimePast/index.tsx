//@ts-ignore
import TimeAgo from 'react-timeago';
import { RiRefreshLine } from 'react-icons/ri';
import { customFormatter } from '@/libs/scripts';
import { ITimePastProps } from '@/libs/types/props';
import './TimePast.css';

const TimePast = ({ date, handle, isLoading, }: ITimePastProps) => {
    return (
        <div
            onClick={handle}
            className={`timepast-wrapper border-style ${
                isLoading ? 'blocked' : ' '
            }`}
        >
            <RiRefreshLine
                className={'refresh-icon'}
            />
            <span>
                <TimeAgo
                    formatter={customFormatter}
                    date={date}
                />
            </span>
        </div>
    );
};

export default TimePast;
