import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from '@/components/Atoms/Button';

describe('Button 컴포넌트', () => {
  test('Button 컴포넌트 default 렌더링', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('border-blue-500 bg-blue-600 text-white hover:bg-blue-800');
  });

  test('Button 컴포넌트 primary 렌더링', () => {
    render(
      <Button type="submit" variant="primary">
        Click me
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveClass('border-blue-500 bg-blue-600 text-white hover:bg-blue-800');
  });

  test('Button 컴포넌트 secondary 렌더링', () => {
    render(
      <Button type="reset" variant="secondary">
        Click me
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
    expect(button).toHaveClass('border-gray-100 bg-gray-200 hover:bg-gray-300 text-gray-800');
  });

  test('Button 컴포넌트 클릭 이벤트 테스트', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
