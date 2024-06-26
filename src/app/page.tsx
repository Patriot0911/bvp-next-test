'use client';

import { Dashboard } from '@/components';
import { useAppSelector } from '@/libs/redux/store';

const Home = () => {
    const themeState = useAppSelector(
        selector => selector.themeReducer.isDarkTheme,
    );
    return (
        <main
            className={themeState ? 'dark' : ''}
        >
            <Dashboard />
        </main>
    );
};

export default Home;
