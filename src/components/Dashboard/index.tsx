'use client';

import { ChartContainer, DatepickerContainer, IntervalSelector, TimePast, } from '@/components';
import { IChartData, ISearchParams } from '@/libs/types/global';
import { useState, useEffect, useRef } from 'react';
import { Intervals } from '@/libs/constants';
import { fetchData } from '@/libs/scripts';
import './Dashboard.css';

const getInitialSecondDate = () => new Date().toISOString().split('T')[0];
const getInitialFirstDate = () => '2021-01-01';

const Dashboard = () => {
    const [secondDate, setSecondDate] = useState(getInitialSecondDate);
    const [lastUpdate, setLastUpdate] = useState(getInitialFirstDate);
    const [firstDate, setFirstDate] = useState(getInitialFirstDate);
    const [chartsData, setChartsData] = useState<IChartData[]>([]);
    const [interval, setInterval] = useState(Intervals.Day);
    const [isLoading, setIsLoading] = useState(true);

    const timer = useRef<any>(null);

    const syncHandle = async () => {
        if(isLoading)
            return;
        setIsLoading(true);
        if(timer.current)
            clearTimeout(timer.current);
        const searchOptions: ISearchParams = {
            startPeriod: firstDate,
            finishPeriod: secondDate,
            interval,
        };
        await fetchData(
            searchOptions,
            setChartsData,
        );
        setIsLoading(false);
        updateTimer(new Date().toISOString());
    };

    const updateTimer = (date: string) => {
        setLastUpdate(date);
        timer.current = setTimeout(
            syncHandle, 1000 * 60 * 3
        );
    };

    useEffect(
        () => {
            const fetchHandle = async (signal?: AbortSignal) => {
                if(!isLoading)
                    setIsLoading(true);
                if(timer.current)
                    clearTimeout(timer.current);
                const searchOptions: ISearchParams = {
                    startPeriod: firstDate,
                    finishPeriod: secondDate,
                    interval,
                };
                await fetchData(
                    searchOptions,
                    setChartsData,
                    signal,
                );
                updateTimer(new Date().toISOString());
                if(isLoading)
                    setIsLoading(false);
            };
            const controller = new AbortController();
            const { signal } = controller;
            fetchHandle(signal);
            return () => controller.abort('Unmount');
        }, [interval, firstDate, secondDate]
    );

    return (
        <section
            className={'dashboard'}
        >
            <div
                className={'action-bar'}
            >
                <IntervalSelector
                    interval={interval}
                    setInterval={setInterval}
                />
                <DatepickerContainer
                    firstDate={firstDate}
                    secondDate={secondDate}
                    setFirstDate={setFirstDate}
                    setSecondDate={setSecondDate}
                />
                <TimePast
                    handle={syncHandle}
                    date={lastUpdate}
                    isLoading={isLoading}
                />
            </div>
            <ChartContainer
                data={chartsData}
            />
        </section>
    );
};

export default Dashboard;
