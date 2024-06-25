import { createContext } from 'react';
import { IContextData } from '@/libs/types/global';

export const ThemeContext = createContext<IContextData>({
    isDarkTheme: false,
    switchThemeHandle: () => {},
});
