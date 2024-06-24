// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { useEffect, useState } from 'react';
import { getChartSets } from '@/libs/scripts';
import { IDataMarkers, IChartProps } from '@/libs/types/props';
import { ICandleStickItem, TCandleXInfo } from '@/libs/types/global';


const initDataMarkers = (): IDataMarkers => ({
    pointDates: [],
    points: [],
});

const MyChart = ({ data, isFilled, isWithZoom, markerSize, isWithTips }: IChartProps) => {
    const [lowerDataPoints, setLowerDataPoints] = useState<ICandleStickItem[]>([]);
    const [riseDataPoints, setRiseDataPoints] = useState<ICandleStickItem[]>([]);
    const [markedDataPoints, setMarkedDataPoints] = useState(initDataMarkers)

    useEffect(
        () => {
            setMarkedDataPoints(initDataMarkers);
        }, [isWithZoom]
    );

    useEffect(
        () => {
            const [lowerSet, riseSet] = getChartSets(data);
            setRiseDataPoints(riseSet);
            setLowerDataPoints(lowerSet);
        }, [data]
    );

    const removeMarker = (x: number) => {
        const filteredPointers = markedDataPoints.pointDates.filter(
            item => item !== x
        );
        const filteredPoints = markedDataPoints.points.filter(
            item => item.x !== x
        );
        setMarkedDataPoints({
            pointDates: filteredPointers,
            points: filteredPoints,
        });
    };

    const addMarker = (x: number, y: TCandleXInfo) => {
        const marker = {
            x,
            y: (y[0] + y[3])/2,
        };
        setMarkedDataPoints({
            pointDates: [
                ...markedDataPoints.pointDates,
                x,
            ],
            points: [
                ...markedDataPoints.points,
                marker,
            ]
        })
    };

    const candleClickHandler = (e: any) => {
        if(!isWithZoom)
            return;
        const { x, y } = e.dataPoint;
        const isInList = markedDataPoints.pointDates.includes(x);
        if(isInList)
            return removeMarker(x);
        addMarker(x, y);
    };

    const markerClickHandler = (e: any) => {
        if(!isWithZoom)
            return;
        const { x, } = e.dataPoint;
        const isInList = markedDataPoints.pointDates.includes(x);
        if(isInList)
            return removeMarker(x);
    };

    const options = () => ({
        zoomEnabled: isWithZoom,
        backgroundColor: null,
        axisX: {
            lineThickness: 0,
            gridThickness: 0.2,
            valueFormatString: "D MMM",
            margin: 10,
        },
        toolTip: {
            enabled: isWithTips,
        },
        axisY2: {
            lineThickness: 0,
            type: 'secondary',
            gridThickness: 0.2,
            prefix: "$",
        },
        data: [
            {
                type: "candlestick",
                axisYType: "secondary",
                fillOpacity: + isFilled,
                yValueFormatString: "$##0.00",
                xValueType: "dateTime",
                color:      "#F23645",
                dataPoints: lowerDataPoints,
                click: candleClickHandler,
            },
            {
                type: "candlestick",
                axisYType: "secondary",
                fillOpacity: + isFilled,
                yValueFormatString: "$##0.00",
                xValueType: "dateTime",
                risingColor:      "#089981",
                color:      "#089981",
                dataPoints: riseDataPoints,
                click: candleClickHandler,
            },
            {
                type: "scatter",
                axisYType: "secondary",
                fillOpacity: 1,
                markerSize,
                markerType: "circle",
                markerColor: "#f1c73e",
                yValueFormatString: "$##0.00",
                xValueType: "dateTime",
                dataPoints: markedDataPoints.points,
                click: markerClickHandler,
            },
        ],
    });

    return (
        <CanvasJSChart
            options={options()}
        />
    );
};

export default MyChart;
