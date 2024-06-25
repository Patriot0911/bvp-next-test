'use client';

import { useState } from 'react';
import { Selector } from '@/components/ui';
import { RiBtcFill } from 'react-icons/ri';
import { ISelectOption } from '@/libs/types/global';
import { SiBinance, SiDogecoin, SiSolana } from 'react-icons/si';
import './CryptocurrencySelector.css';

interface ICryptocurrencySelectorProps {
    setCryptocurrency: (value: string) => void;
};

const CryptocurrencySelector = ({ setCryptocurrency, }: ICryptocurrencySelectorProps) => {
    const [optios] = useState<ISelectOption<string>[]>([{
            value: 'BTC-USD',
            children: <RiBtcFill
            />,
        },
        {
            value: 'DOGE-USD',
            children: <SiDogecoin
            />,
        },
        {
            value: 'BNB-USD',
            children: <SiBinance
            />,
        },
        {
            value: 'SOL-USD',
            children: <SiSolana
            />,
        },
    ]);
    return (
        <Selector
            options={optios}
            setValue={setCryptocurrency}
            className={'crypto-select-item'}
        />
    );
};

export default CryptocurrencySelector;
