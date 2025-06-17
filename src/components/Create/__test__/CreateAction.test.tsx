import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import CreateAction from '../CreateAction';

jest.mock('@toss/use-overlay', () => ({
  OverlayProvider: ({ children }: { children: React.ReactNode }) => children,
  useOverlay: () => ({
    open: jest.fn(),
    close: jest.fn(),
  }),
}));

describe('CreateAction 컴포넌트', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  test('CreateAction 컴포넌트 생성 모드 렌더링 확인', () => {
    render(
      <MemoryRouter>
        <CreateAction />
      </MemoryRouter>,
    );

    const iconButtons = screen.getAllByRole('button');
    expect(iconButtons).toHaveLength(1);

    const icon = iconButtons[0].querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  test('CreateAction 컴포넌트 수정 모드 렌더링 확인', () => {
    render(
      <MemoryRouter initialEntries={['/edit/tpl-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc']}>
        <Routes>
          <Route path="/edit/:id" element={<CreateAction />} />
        </Routes>
      </MemoryRouter>,
    );

    const createAction = screen.getAllByRole('button');
    expect(createAction).toHaveLength(2);

    const icon = createAction[0].querySelector('svg');
    expect(icon).toBeInTheDocument();

    const icon2 = createAction[1].querySelector('svg');
    expect(icon2).toBeInTheDocument();
  });
});
