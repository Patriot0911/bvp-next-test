import { render, screen } from '@testing-library/react';
import ReduxProvider from '@/libs/redux/provider';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { act } from 'react';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        state: true,
        data: [],
    }),
})) as any;

describe('Switch to dark mode', () => {
    it('Switch action', async () => {
        render(
            <ReduxProvider>
                <Home />
            </ReduxProvider>
        );
        const mainTestId = 'main';
        const testId = 'dark-theme-switch';
        const mainElement = await screen.findByTestId(mainTestId);
        const element = await screen.findByTestId(testId);

        expect(mainElement).toBeInTheDocument();
        expect(element).toBeInTheDocument();

        const oldMainClassName = mainElement.className;
        act(
            () => element.click()
        );
        const newMainClassName = mainElement.className;
        expect(oldMainClassName).toBe('');
        expect(newMainClassName).toBe('dark');
    });
});
