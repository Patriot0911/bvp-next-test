import { IThemeInitState } from '@/libs/types/global';
import { createSlice, } from '@reduxjs/toolkit';

const initialState: IThemeInitState = {
    isDarkTheme: false,
};

export const themeSettings = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state) => ({
            isDarkTheme: !state.isDarkTheme,
        }),
    },
});

export const {
    switchTheme,
} = themeSettings.actions;

export default themeSettings.reducer;