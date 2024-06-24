import { Intervals } from '@/libs/constants';
import { PropsWithChildren } from 'react';
import { IChartData } from './global';

export interface IChartContainerProps {
    data: IChartData[];
};

export interface IChartProps extends IChartContainerProps {
    isFilled: boolean;
    markerSize: number;
    isWithZoom: boolean;
    isWithTips: boolean;
};

export interface IDataMarkers {
    pointDates: number[];
    points: {
        x: number;
        y: number;
    }[];
};

export interface IDatepickerContainerProps {
    firstDate: string;
    secondDate: string;
    setFirstDate: (arg: string) => void;
    setSecondDate: (arg: string) => void;
};

export interface IDatepickerProps {
    min?: string;
    max?: string;
    value: string;
    setValue: (arg: string) => void;
};

export interface IIntervalSelectorProps {
    interval: Intervals;
    setInterval: (arg: Intervals) => void;
};

export interface ITimePastProps {
    date: string;
    isLoading: boolean;
    handle: () => void;
};

export interface ILoadingWrapperProps extends PropsWithChildren {
    isLoading: boolean;
    errorMessage?: string;
};

export interface IMarkersFieldWrapperProps extends PropsWithChildren {
    isWithZoom: boolean;
    markerSize: number;
};

