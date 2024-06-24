'use client';

import MarkersFieldWrapper from '@/components/MarkersFieldWrapper';
import { TbZoomScan, TbZoomScanFilled } from 'react-icons/tb';
import { IChartContainerProps } from '@/libs/types/props';
import { ChangeEvent, useState } from 'react';
import { FaFillDrip } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import './ChartContainer.css';

const Chart = dynamic(
    () => import('@/components/Chart'), {
        ssr: false,
    },
);

const ChartContainer = ({ data, }: IChartContainerProps) => {
    const [isWithZoom, setIsWithZoom] = useState(false);
    const [markerSize, setMarkerSize] = useState(25);
    const [isFilled, setIsFilled] = useState(true);

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
                    isWithZoom={isWithZoom}
                    markerSize={markerSize}
                />
            </MarkersFieldWrapper>
            <div
                className={'toolbar-container'}
            >
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
                        !isWithZoom ?
                        <TbZoomScan /> :
                        <TbZoomScanFilled />
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
