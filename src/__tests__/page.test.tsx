import { render, screen } from '@testing-library/react';
import ReduxProvider from '@/libs/redux/provider';
import '@testing-library/jest-dom';
import Home from '@/app/page';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
        state: true,
        data: [],
    }),
})) as any;

describe('Page elements', () => {
    it('primary elements', async () => {
        render(
            <ReduxProvider>
                <Home />
            </ReduxProvider>
        );
        const elementNames = [
            'toolbar-container',
            'markersfield-container',
            'interval-selector',
            'datapicker',
        ];
        for(const item of elementNames) {
            const element = await screen.findByTestId(item);
            expect(element).toBeInTheDocument();
        };
    });
});
