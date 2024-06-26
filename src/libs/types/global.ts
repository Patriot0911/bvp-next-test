import { Intervals } from '@/libs/constants';
import { PropsWithChildren } from 'react';

export interface IChartData {
    volume:     number;
    date:       string;
    open:       number;
    high:       number;
    low:        number;
    close:      number;
    adjClose:   number;
};

export type TCandleXInfo = [number, number, number, number];

export interface ICandleStickItem {
    x: number;
    y: TCandleXInfo;
};

export type TSetChartHandle = (charts: IChartData[]) => void;

export interface ISearchParams {
    startPeriod?: string;
    finishPeriod?: string;
    interval?: Intervals;
    target?: string;
};

export interface ISelectOption<Type> extends PropsWithChildren {
    value: Type;
};

export interface ILocalMarker {
    x: number;
    y: number;
};

export type TFetchResponse = Promise<IChartData | undefined>;

export interface IContextData {
    isDarkTheme: boolean;
    switchThemeHandle: () => void;
};

export interface IThemeInitState {
    isDarkTheme: boolean;
};
