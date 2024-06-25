'use client';

import { Dashboard } from '@/components';
import { ThemeContextProvider } from '@/components';

const Home = () => {
    return (
        <main>
            <ThemeContextProvider>
                <Dashboard />
            </ThemeContextProvider>
        </main>
    );
};

export default Home;
