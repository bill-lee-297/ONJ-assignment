import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import ToggleButton from '@/components/Atoms/ToggleButton';

describe('ToggleButton 컴포넌트', () => {
  test('ToggleButton이 true일 때 파란색 배경', () => {
    render(<ToggleButton required={true} onToggleRequired={jest.fn()} />);
    const button = screen.getByRole('button');
    const span = button.querySelector('span');
    expect(button).toHaveClass('bg-blue-500');
    expect(span).toHaveClass('translate-x-4');
  });

  test('ToggleButton이 false일 때 회색 배경', () => {
    render(<ToggleButton required={false} onToggleRequired={jest.fn()} />);
    const button = screen.getByRole('button');
    const span = button.querySelector('span');
    expect(button).toHaveClass('bg-gray-300');
    expect(span).not.toHaveClass('translate-x-4');
  });

  test('클릭 시 onToggleRequired가 호출됨', () => {
    const onToggle = jest.fn();
    render(<ToggleButton required={false} onToggleRequired={onToggle} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
