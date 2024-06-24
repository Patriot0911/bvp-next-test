import { Intervals } from '@/libs/constants';

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
};

export interface ISelectOption {
    name: string;
    value: Intervals;
};

export interface ILocalMarker {
    x: number;
    y: number;
};
