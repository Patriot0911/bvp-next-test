import { Intervals } from '@/libs/constants';
import { PropsWithChildren } from 'react';
import { IChartData, ISelectOption } from './global';

export interface IChartContainerProps {
    data: IChartData[];
};

export interface IChartProps {
    data: IChartData[];
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

export interface ISelectorProps<T> {
    className?: string;
    setValue: (arg: T) => void;
    options: ISelectOption<T>[];
};

export interface IThemeContextProviderProps extends PropsWithChildren {
    init?: boolean;
};

export interface ICryptocurrencySelectorProps {
    setCryptocurrency: (value: string) => void;
};
