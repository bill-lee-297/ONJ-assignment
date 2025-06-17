import '@testing-library/jest-dom';

import { act, fireEvent, renderHook, screen, waitFor } from '@testing-library/react';
import { OverlayProvider } from '@toss/use-overlay';

import useAlert from '@/hooks/useAlert';

describe('useAlert 훅', () => {
  test('useAlert 훅 렌더링 확인 클릭', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: OverlayProvider });
    let returnModal: Promise<boolean>;
    act(() => {
      returnModal = result.current('modal test', { cancel: true });
    });

    const alertModal = await screen.findByText('modal test');
    await expect(alertModal).toBeInTheDocument();

    const button = await screen.findByText('확인');
    await expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(returnModal).resolves.toBe(true);
    });
    await expect(alertModal).not.toBeInTheDocument();
  });

  test('useAlert 훅 렌더링 확인 취소 클릭', async () => {
    const { result } = renderHook(() => useAlert(), { wrapper: OverlayProvider });
    let returnModal: Promise<boolean>;
    act(() => {
      returnModal = result.current('modal test', { cancel: true });
    });

    const alertModal = await screen.findByText('modal test');
    await expect(alertModal).toBeInTheDocument();

    const button = await screen.findByText('취소');
    await expect(button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(returnModal).resolves.toBe(false);
    });
    await expect(alertModal).not.toBeInTheDocument();
  });
});
