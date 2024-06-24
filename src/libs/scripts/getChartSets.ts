import { ICandleStickItem, IChartData } from '@/libs/types/global';

const getChartSets = (data: IChartData[]) => {
    const mappedData = data.map(
        item => ({
            x: Date.parse(item.date),
            y: [
                item.open,
                item.high,
                item.low,
                item.close,
            ],
        })
    );
    const lowerSet: ICandleStickItem[] = [];
    const riseSet: ICandleStickItem[] = [];
    for(const item of mappedData) {
        const { y } = item;
        if(y[0] > y[3]) {
            lowerSet.push(item as any);
            continue;
        };
        riseSet.push(item as any);
    };
    return [lowerSet, riseSet];
};

export default getChartSets;
