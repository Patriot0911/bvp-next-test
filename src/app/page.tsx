'use client';

import { Dashboard } from '@/components';
import { ThemeContextProvider } from '@/components';
import { ThemeContext } from '@/libs/context';
import { useContext } from 'react';

const Home = () => {
    const {
        isDarkTheme,
    } = useContext(ThemeContext);

    return (
        <main
            className={
                isDarkTheme ? 'dark' : ''
            }
        >
            <ThemeContextProvider>
                <Dashboard />
            </ThemeContextProvider>
        </main>
    );
};

export default Home;
