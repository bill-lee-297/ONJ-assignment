import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import CheckInput from '@/components/Atoms/CheckInput';

describe('CheckInput 컴포넌트', () => {
  test('CheckInput 컴포넌트 default 렌더링', () => {
    render(<CheckInput type="checkbox" onChange={jest.fn()} />);
    const checkInput = screen.getByRole('checkbox');
    expect(checkInput).toHaveAttribute('type', 'checkbox');
    expect(checkInput).toHaveClass('w-4 h-4');
    expect(checkInput).toHaveAttribute('value', '');
    expect(checkInput).toHaveAttribute('checked');
  });

  test('CheckInput 컴포넌트 props 테스트', () => {
    const onChange = jest.fn();
    render(<CheckInput type="checkbox" className="bg-red-500" checked={false} value="test" onChange={onChange} />);
    const checkInput = screen.getByRole('checkbox');
    expect(checkInput).toHaveClass('bg-red-500 w-4 h-4');
    expect(checkInput).not.toHaveAttribute('checked');
    expect(checkInput).toHaveAttribute('value', 'test');
    fireEvent.click(checkInput);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
