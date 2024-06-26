'use client';

import { ChartContainer, CryptocurrencySelector, DatepickerContainer, IntervalSelector, TimePast, } from '@/components';
import { Intervals, cryptoList, refreshTime } from '@/libs/constants';
import { IChartData, ISearchParams } from '@/libs/types/global';
import { useState, useEffect, useRef } from 'react';
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
    const [cryptoType, setCryptoType] = useState(cryptoList[0]);
    const [isLoading, setIsLoading] = useState(true);

    const timer = useRef<any>(null);

    const updateTimer = (date: string) => {
        if(timer.current)
            clearTimeout(timer.current);
        setLastUpdate(date);
        timer.current = setTimeout(
            syncHandle, refreshTime * 1000
        );
    };

    const getSearchOptions = (): ISearchParams => ({
        startPeriod: firstDate,
        finishPeriod: secondDate,
        target: cryptoType,
        interval,
    });

    const syncHandle = async () => {
        setIsLoading(true);
        const searchOptions = getSearchOptions();
        await fetchData(
            searchOptions,
            setChartsData,
        );
        setIsLoading(false);
        updateTimer(new Date().toISOString());
    };

    useEffect(
        () => {
            const fetchHandle = async (signal?: AbortSignal) => {
                const searchOptions = getSearchOptions();
                await fetchData(
                    searchOptions,
                    setChartsData,
                    signal,
                );
                setIsLoading(false);
                updateTimer(new Date().toISOString());
            };
            setIsLoading(true);
            const controller = new AbortController();
            const { signal } = controller;
            fetchHandle(signal);
            return () => {
                controller.abort('Unmount');
                setIsLoading(false);
            };
        }, [interval, firstDate, secondDate, cryptoType]
    );

    return (
        <section
            className={'dashboard'}
        >
            <div
                className={'action-bar'}
            >
                <CryptocurrencySelector
                    setCryptocurrency={setCryptoType}
                />
                <IntervalSelector
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
