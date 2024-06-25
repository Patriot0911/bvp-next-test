import { useState } from 'react';
import { ThemeContext } from '@/libs/context';
import { IThemeContextProviderProps } from '@/libs/types/props';

const ThemeContextProvider = ({ children, init, }: IThemeContextProviderProps ) => {
    const [isDarkTheme, setIsDarkTheme] = useState(init ?? false);

    const switchThemeHandle = () => setIsDarkTheme(
        prevState => !prevState
    );

    return (
        <ThemeContext.Provider
            value={{
                switchThemeHandle,
                isDarkTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
