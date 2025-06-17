import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Box from '@/components/Atoms/Box';

describe('Box 컴포넌트', () => {
  test('Box 컴포넌트 default 렌더링', () => {
    render(<Box>Click me</Box>);
    const box = screen.getByText('Click me');
    expect(box).toHaveClass('flex flex-col gap-2 border border-gray-300 rounded-md p-4');
  });

  test('Box 컴포넌트 클래스, 클릭 이벤트 테스트', () => {
    const onClick = jest.fn();
    render(
      <Box className="bg-red-500" onClick={onClick}>
        Click me
      </Box>,
    );
    const box = screen.getByText('Click me');
    expect(box).toHaveClass('bg-red-500');
    fireEvent.click(box);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
