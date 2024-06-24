import { NextRequest, NextResponse } from 'next/server';
import { getSearchOptions } from '@/libs/scripts';
import yahooFinance from 'yahoo-finance2';

export async function GET(req: NextRequest) {
    const { nextUrl: { searchParams, } } = req;
    const target = 'BTC-USD';
    const options = getSearchOptions(searchParams);
    try {
        const result = await yahooFinance.historical(
            target,
            options as any,
        );
        return NextResponse.json({
            state: true,
            data: result,
        }, { status: 200, });
    } catch (error: any) {
        return NextResponse.json({
            state: false,
            message: error.message,
        }, { status: 500, });
    };
};
