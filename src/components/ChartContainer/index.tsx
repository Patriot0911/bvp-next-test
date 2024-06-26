'use client';

import { RiInformationLine, RiInformationOffFill } from 'react-icons/ri';
import MarkersFieldWrapper from '@/components/MarkersFieldWrapper';
import { switchTheme } from '@/libs/redux/features/theme-slice';
import { TbZoomScan, TbZoomScanFilled } from 'react-icons/tb';
import { IChartContainerProps } from '@/libs/types/props';
import { useAppSelector } from '@/libs/redux/store';
import { ChangeEvent, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { FaFillDrip } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import './ChartContainer.css';

const Chart = dynamic(
    () => import('@/components/Chart'), {
        ssr: false,
    },
);

const ChartContainer = ({ data, }: IChartContainerProps) => {
    const [isWithZoom, setIsWithZoom] = useState(false);
    const [isWithTips, setIsWithTips] = useState(true);
    const [markerSize, setMarkerSize] = useState(25);
    const [isFilled, setIsFilled] = useState(true);

    const dispatch = useDispatch();
    const themeState = useAppSelector(
        selector => selector.themeReducer.isDarkTheme,
    );

    const switchThemeHandle = () => {
        dispatch(switchTheme());
    };

    const fillHandle = () => {
        setIsFilled(
            prevState => !prevState
        );
    };

    const withZoomHandle = () => {
        setIsWithZoom(
            prevState => !prevState
        );
    };

    const markerRangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        const size = parseInt(targetValue);
        if(isNaN(size))
            return;
        setMarkerSize(size);
    };

    const withTipsHandle = () => {
        setIsWithTips(
            prevState => !prevState
        );
    };

    return (
        <div
            className={'chart-container border-style'}
        >
            <MarkersFieldWrapper
                isWithZoom={isWithZoom}
                markerSize={markerSize}
            >
                <Chart
                    data={data}
                    isFilled={isFilled}
                    isWithTips={isWithTips}
                    isWithZoom={isWithZoom}
                    markerSize={markerSize}
                />
            </MarkersFieldWrapper>
            <div
                className={'toolbar-container'}
                data-testid={'toolbar-container'}
            >
                <div
                    className={'tool-item'}
                    data-testid={'dark-theme-switch'}
                    onClick={switchThemeHandle}
                >
                    {
                        themeState ?
                        <FaMoon /> :
                        <FaSun />
                    }
                </div>
                <div
                    className={'tool-item'}
                    onClick={fillHandle}
                >
                    <FaFillDrip />
                </div>
                <div
                    className={'tool-item'}
                    onClick={withZoomHandle}
                >
                    {
                        isWithZoom ?
                        <TbZoomScan /> :
                        <TbZoomScanFilled />
                    }
                </div>
                <div
                    className={'tool-item'}
                    onClick={withTipsHandle}
                >
                    {
                        isWithTips ?
                        <RiInformationLine /> :
                        <RiInformationOffFill />
                    }
                </div>
                <div
                    className={'tool-item'}
                >
                    <input
                        type={'range'}
                        value={markerSize.toString()}
                        min={1}
                        max={50}
                        onChange={markerRangeHandle}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartContainer;
