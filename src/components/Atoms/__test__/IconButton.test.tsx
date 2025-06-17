import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { GrDuplicate } from 'react-icons/gr';

import IconButton from '@/components/Atoms/IconButton';

describe('IconButton 컴포넌트', () => {
  test('IconButton 컴포넌트 렌더링', () => {
    const onClick = jest.fn();
    render(
      <IconButton onClick={onClick}>
        <GrDuplicate size={20} />
      </IconButton>,
    );
    const iconButton = screen.getByRole('button');
    expect(iconButton).toHaveClass(
      'flex flex-row items-center gap-2 p-3 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-md cursor-pointer',
    );
    const icon = iconButton.querySelector('svg');
    expect(icon).toBeInTheDocument();

    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
