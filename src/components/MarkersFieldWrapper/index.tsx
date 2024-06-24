'use client';

import { FaDiamond } from 'react-icons/fa6';
import { ILocalMarker } from '@/libs/types/global';
import { IMarkersFieldWrapperProps } from '@/libs/types/props';
import { DragEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import './MarkersFieldWrapper.css';

const MarkersFieldWrapper = ({ children, isWithZoom, markerSize, }: IMarkersFieldWrapperProps) => {
    const [markers, setMarkers] = useState<ILocalMarker[]>([]);
    const markersFieldRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => setMarkers([]),
        [isWithZoom]
    );

    const addMarker = (x: number, y: number) => {
        const marker = {
            x: x,
            y: y,
        };
        setMarkers(
            prevState => ([
                ...prevState,
                marker,
            ])
        );
    };

    const deleteMarker = (marker: ILocalMarker) => {
        const filteredMarkers = markers.filter(
            item => item.x !== marker.x && item.y !== marker.y
        );
        setMarkers(filteredMarkers);
    };

    const changeMarker = (oldMarker: ILocalMarker, newMarker: ILocalMarker) => {
        const filteredMarkers = markers.filter(
            item => item.x !== oldMarker.x && item.y !== oldMarker.y
        );
        setMarkers([
            ...filteredMarkers,
            newMarker,
        ]);
    };

    const addClickHandle = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(isWithZoom)
            return;
        const elementRect = markersFieldRef.current?.getBoundingClientRect();
        if(!elementRect)
            return;
        const x = e.clientX - elementRect.left;
        const y = e.clientY - elementRect.top;
        addMarker(x, y);
    };

    const deleteClickHandle = (item: ILocalMarker) => (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(isWithZoom)
            return;
        e.preventDefault();
        deleteMarker(item);
    };

    const dragHandle = (item: ILocalMarker) => (e: DragEvent<HTMLOrSVGElement>) => {
        const elementRect = markersFieldRef.current?.getBoundingClientRect();
        const h = markersFieldRef.current?.offsetHeight;
        const w = markersFieldRef.current?.offsetWidth;
        if(!elementRect || !h || !w)
            return;
        const x = e.clientX - elementRect.left;
        const y = e.clientY - elementRect.top;
        if(x < 0 || y < 0 || x > w || y > h)
            return deleteMarker(item);
        const marker = {
            x: x,
            y: y,
        };
        changeMarker(item, marker);
    };

    const dragTouchHandle = (item: ILocalMarker) => (e: React.TouchEvent) => {
        const elementRect = markersFieldRef.current?.getBoundingClientRect();
        const h = markersFieldRef.current?.offsetHeight;
        const w = markersFieldRef.current?.offsetWidth;
        if(!elementRect || !h || !w)
            return;
        const x = e.changedTouches[0].clientX - elementRect.left;
        const y = e.changedTouches[0].clientY - elementRect.top;
        if(x < 0 || y < 0 || x > w || y > h)
            return deleteMarker(item);
        const marker = {
            x: x,
            y: y,
        };
        changeMarker(item, marker);
    };

    return (
        <div
            className={'relative overflow-hidden'}
        >
            {
                markers.map(
                    (item, index) =>
                    <div
                        key={`${index}-marker-${item.x}`}
                        draggable
                        onDragEnd={dragHandle(item)}
                        onTouchEnd={dragTouchHandle(item)}
                    >
                        <FaDiamond
                            onContextMenu={deleteClickHandle(item) as any}
                            className={'marker'}
                            style={{
                                left: item.x-markerSize/2,
                                top: item.y-markerSize/2,
                                width: markerSize,
                                height: markerSize,
                                color: ' rgb(245, 173, 79)',
                            }}
                        />
                    </div>
                )
            }
            <div
                onClick={addClickHandle as any}
                ref={markersFieldRef}
            >
                {children}
            </div>
        </div>
    );
};

export default MarkersFieldWrapper;
